import React, { useState } from "react";

const OutSideForm = ({ partyList, generateStock }) => {
  // party change handler for selectBox
  const [selectedParty, setselectedParty] = useState("");

  // onchange events save in state
  const [value, setvalue] = useState([
    {
      id: 0,
      stoneId: "",
      weight: "",
    },
  ]);

  const { stoneId } = value;

  const onInputChange = (id, name, value) => {
    const data = value.findIndex((item) => item?.id === id);
    if (data) {
      const filteredData = value?.map((i) => {
        if (i.id === id) {
          i[name] = i[value];
        }
        return i;
      });

      setvalue(filteredData);
    }
  };

  const onSubmitHandler = () => {
    const data = JSON.stringify({
      lot_no: "",
      stone_id: stoneId,
      party: selectedParty,
      current_assign: "",
      status: 0, // status is default 1 for outside party
    });
    generateStock(data);
  };

  const appendRowHandler = () => {
    const data = {
        id: value?.length + 1,
        stoneId: "",
        weight: "",
    }

    setvalue([...value, data])
  }

  const removeHandler = (id) => {
    const filterdData = value?.filter((i) => i.id !== id)
    setvalue(filterdData)
  }
  return (
    <div>
      <div className="form-group">
        <label>Select Party</label>
        <select
          name="party"
          className="form-control  mb-4"
          onChange={() => setselectedParty(e?.target?.value)}
        >
          {partyList?.map((item) => {
            return <option value={item?.id}>{item?.name}</option>;
          })}
        </select>
      </div>
      <div>
        {value?.map((i) => {
          return (
            <div className="d-flex">
              <div className="form-group">
                <label>Stone Id</label>
                <input
                  type="text"
                  className="form-control  mb-4"
                  name="stoneId"
                  onChange={() =>
                    onInputChange(i.id, e?.target?.name, e?.target?.value)
                  }
                  placeholder="Enter stoneId"
                  required=""
                />
              </div>
              <div className="form-group">
                <label>Weight</label>
                <input
                  type="text"
                  className="form-control  mb-4"
                  name="weight"
                  onChange={() =>
                    onInputChange(i.id, e?.target?.name, e?.target?.value)
                  }
                  placeholder="Enter Weight"
                  required=""
                />
              </div>

              <div className="form-group">
              <label>Action</label>
                <button  onClick={() => removeHandler(i?.id)}>
                    remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="form-group">
        <button className="btn btn-secondary" onClick={appendRowHandler}>
          Add Stone Id/weight
        </button>
      </div>
      <button
        type="submit"
        className="btn btn-primary mb-2 btn-custom"
        onClick={onSubmitHandler}
        name="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default OutSideForm;
