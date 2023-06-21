import React, { useState,useEffect } from "react";
import axios from "axios";
import Sunburst from "react-zoomable-sunburst-d3-v4";

// const data = {
//   name: "TOPICS",
//   children: [
//     {
//       name: "Topic A",
//       children: [{ name: "Sub A1", size: 4 }, { name: "Sub A2", size: 4 }]
//     },
//     {
//       name: "Topic B",
//       children: [
//         { name: "Sub B1", size: 3 },
//         { name: "Sub B2", size: 3 },
//         {
//           name: "Sub B3",
//           size: 3
//         }
//       ]
//     },
//     {
//       name: "Topic C",
//       children: [{ name: "Sub A1", size: 4 }, { name: "Sub A2", size: 4 }]
//     }
//   ]
// };

const baseUrl = "http://127.0.0.1:5000/quote-data";

const SunburstD3V4 = () => {
  const onSelect = (event) => {
    // console.log(event);
  };
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
        setPost(response.data);
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
