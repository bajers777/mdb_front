import React, { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";
import { getComponents } from './backend';
import Theme from "./Theme";
export default function App() {
  const [listItems, setListItems] = useState([])

  useEffect(() => {
    getComponents().then(res => setListItems(res));
  }, [])

  return (
    <Theme>
      <Form listItems={listItems} setListItems={setListItems} />
      <Table setListItems={setListItems} listItems={listItems} />
    </Theme>
  );
}