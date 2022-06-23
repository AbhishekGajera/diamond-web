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
      status: 0, // status is default 0 for outside party
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
      <div className='row'>
        <div className="form-group  col-md-4">
          <label>Stone Id</label>
        </div>
        <div className="form-group  col-md-4">
          <label>Weight</label>
        </div>
        <div className="form-group col-md-4">
        </div>
      </div>
        {value?.map((i) => {
          return (
            <div className="d-flex">
              <div className="form-group mr-20">
                <input
                  type="text"
                  className="form-control  mb-4"
                  name="stoneId"
                  onChange={() =>
                    onInputChange(i.id, e?.target?.name, e?.target?.value)
                  }
                  placeholder="Enter stoneId"
                  required=""
                  onKeyPress={(e) => e.key === 'Enter' && appendRowHandler()}
                />
              </div>
              <div className="form-group mr-20">
                <input
                  type="text"
                  className="form-control  mb-4"
                  name="weight"
                  onChange={() =>
                    onInputChange(i.id, e?.target?.name, e?.target?.value)
                  }
                  placeholder="Enter Weight"
                  required=""
                  onKeyPress={(e) => e.key === 'Enter' && appendRowHandler()}
                />
              </div>

              <div className="form-group">
                <div onClick={() => removeHandler(i?.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="red" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="form-group">
        <button className="btn btn-success" onClick={appendRowHandler}>
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
