'use client';

import { Button, Navbar } from 'flowbite-react';

export default function NavBar() {
  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="https://github.com/abdurafeyf">
        <img
            alt="US Market"
            className="mr-0 h-8 sm:h-16 bg-white rounded-full p-1"
            src="https://raw.githubusercontent.com/abdurafeyf/us-market/main/client/public/logo.png"
        />
            <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white ml-1">
                US Market Analyzer
            </span>

      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>
          Get started
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="#"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="#">
          Services
        </Navbar.Link>
        <Navbar.Link href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


