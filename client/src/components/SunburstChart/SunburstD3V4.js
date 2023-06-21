import React, { useState, useEffect } from "react";
import axios from "axios";
import Sunburst from "react-zoomable-sunburst-d3-v4";

const baseUrl = "http://127.0.0.1:5000/quote-data";
let data = {
    name: "TOPICS",
    children: [
      {
        name: "Topic A",
        children: [{ name: "Sub A1", size: 4 }, { name: "Sub A2", size: 4 }]
      },
      {
        name: "Topic B",
        children: [
          { name: "Sub B1", size: 3 },
          { name: "Sub B2", size: 3 },
          {
            name: "Sub B3",
            size: 3
          }
        ]
      },
      {
        name: "Topic C",
        children: [{ name: "Sub A1", size: 4 }, { name: "Sub A2", size: 4 }]
      }
    ]
  };
  console.log('main data', data);
const SunburstD3V4 = () => {
  const onSelect = (event) => {
    // console.log(event);
  };

  const transformData = (data) => {
    const transformedData = {
      name: "NASDAQ",
      children: [],
    };

    data.forEach((sector) => {
      const sectorNode = {
        name: sector.stock_sector_name,
        children: [],
      };

      sector.stocks.forEach((stock) => {
        sectorNode.children.push({
          name: stock.stock_symbol,
          size: stock.weightage,
        });
      });

      transformedData.children.push(sectorNode);
    });

    return transformedData;
  };

  const [post, setPost] = useState(null);
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      const transformedData = transformData(response.data.data);
      setPost(transformedData);
    });
  }, []);

  if (!post) return null;
  console.log(post);

  return (
    <div>
      <Sunburst
        data={post}
        onSelect={onSelect}
        scale="linear"
        tooltipContent={
          <div
            className="sunburstTooltip"
            style={{
              position: "absolute",
              color: "black",
              zIndex: 10,
              background: "#e2e2e2",
              padding: 5,
              textAlign: "center"
            }}
          />
        }
        tooltip
        tooltipPosition="right"
        keyId="anagraph"
        width="480"
        height="400"
      />
    </div>
  );
};

export default SunburstD3V4;
