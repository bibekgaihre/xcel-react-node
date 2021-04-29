import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import * as XLSX from "xlsx";

export default function FileUploader() {
  const [data, setData] = useState({ message: "" });
  const columns = [
    {
      name: "Sn",
      selector: "sn",
      sortable: true,
    },
    {
      name: "ID",
      selector: "id",
      sortable: true,
      right: true,
    },
    {
      name: "UniqueID",
      selector: "uniqueId",
      sortable: false,
      right: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: false,
      right: true,
    },
    {
      email: "EMail",
      selector: "email",
      sortable: false,
      right: true,
    },
    {
      name: "Phone Number",
      selector: "phonenumber",
      sortable: false,
      right: true,
    },
  ];
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(true);

  const handleChange = (state) => {
    console.log(state);
    console.log("Selected Rows: ", state.selectedRows);
  };
  async function fetchUsers() {
    let response = await fetch("http://localhost:5000/api/file/getusers");

    let user = await response.json();
    if (user.length > 0) {
      setShow(false);
    }

    setUser(user);
  }
  useEffect(() => {
    fetchUsers();
    // setInterval(fetchUsers, 15000);
  });

  useEffect(() => {
    async function test() {
      let response = await fetch("http://localhost:5000/api/file");
      let data = await response.json();

      setData({ message: data.message });
    }
    test();
  }, []);

  const onShowText = async (e) => {
    e.preventDefault();

    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const onProcessData = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:5000/api/file/processdata");
    //list here on state anda data table
    console.log(await response.json());
    fetchUsers();
  };
  const onReadFile = async (e) => {
    let endpoint = e.target.name;
    const file = e.target.files[0];
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const buffer = e.target.result;

        const workBook = XLSX.read(buffer, { type: "buffer" });
        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];
        const data = XLSX.utils.sheet_to_json(workSheet);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    let data = await promise.then((d) => {
      return d;
    });
    try {
      let response = await fetch(`http://localhost:5000/api/file/${endpoint}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        e.target.value = null;
        alert(`${endpoint} successfull`);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Container>
        <h1>Excel Merger</h1>
        <Button variant="primary" size="lg" onClick={onShowText}>
          {show ? "hide" : "show"} Buttons
        </Button>
        <h2>{show ? data.message : ""}</h2>
        <br />
        <Form>
          <div className="md-3">
            <Form.File
              id="formcheck-api-regular"
              style={{ visibility: show ? "visible" : "hidden" }}
            >
              <Form.File.Label className="">File 1</Form.File.Label>
              <Form.File.Input
                name="uploadfile1"
                className="text-center"
                onChange={onReadFile}
                style={{ visibility: show ? "visible" : "hidden" }}
              />
            </Form.File>
          </div>
          <div className="md-3">
            <Form.File
              id="formcheck-api-regular"
              style={{ visibility: show ? "visible" : "hidden" }}
            >
              <Form.File.Label className="">File 2</Form.File.Label>
              <Form.File.Input
                name="uploadfile2"
                className="text-center"
                onChange={onReadFile}
              />
            </Form.File>
          </div>
          <div className="md-3"></div>
        </Form>
        <Button
          variant="primary"
          size="lg"
          onClick={onProcessData}
          style={{ visibility: show ? "visible" : "hidden" }}
        >
          Process Data
        </Button>
        {user ? (
          <DataTable
            title="Users Data"
            columns={columns}
            selectableRows
            pagination
            Clicked
            Selected={handleChange}
            data={user}
          />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}
