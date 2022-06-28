import React, { useState,useEffect } from "react";
import useFocusNext from '../../Hooks/useFocusNext'

const OutSideForm = ({ partyList, generateStock }) => {
  // party change handler for selectBox
  const [selectedParty, setselectedParty] = useState(partyList[0]?.id);
  const focusNextRef = useFocusNext();
  const [lotNo, setlotNo] = useState("");
  const [partyCode, setPartyCode] = useState("");



  // onchange events save in state
  const [value, setvalue] = useState([
    {
      id: 0,
      stoneId: "",
      weight: "",
    },
  ]);

  const onInputChange = (ids, name, values) => {
    const filteredData = value?.map((i) => {
      if (i.id === ids) {
        i[name] = values;
      }
      return i;
    });
    setvalue(filteredData);
  };

  const onSubmitHandler = () => {
    value?.map((i) => {
      if (i.stoneId && i.weight) {
        const data = JSON.stringify({
          lot_no: lotNo,
          stock_type: 0,//0 for outside
          stone_id: i.stoneId,
          party: selectedParty,
          party_code: partyCode,
          current_assign: selectedParty,
          weight: i.weight,
          status: 0, // status is default 0 for issue
        });

        generateStock(data);
      }
    })
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
  function func(data) {
    const itemValue = JSON.parse(data)
    setselectedParty(itemValue.id)
    let nfn = itemValue.name.match(/\b(\w)/g);
    if (nfn != null) {
      const Pname = nfn[0] + nfn[1];
      setPartyCode(Pname)
    } else {
      setPartyCode("")
    }
  }

  return (
    <div>
      <div className="form-group">
        <label>Select Party</label>
        <select
          name="party"
          className="form-control  mb-4"
          onChange={(e) => func(e?.target?.value)}
        >
          {partyList?.map((item) => {
            return <option value={JSON.stringify(item)} key={item.id}>{item?.name}</option>;
          })}
        </select>
      </div>
      <div>
        <div className='row'>
          <div className="form-group  col-md-6">
            <label>Party Code </label>
            <div className="form-group mr-20">
              <input type="text" name="partycode" className="form-control  mb-4" value={partyCode} placeholder='Enter Party Code'
                onChange={(e) => setPartyCode(e?.target?.value)} />
            </div>
          </div>
          <div className="form-group  col-md-6">
            <label>Lot No </label>
            <div className="form-group mr-20">
              <input type="text" name="lotNo" className="form-control  mb-4" placeholder='Enter Lot No'
                onChange={(e) => setlotNo(e?.target?.value)} />
            </div>
          </div>

        </div>
        <div className='row'>
          <div className="form-group  col-md-4">
            <label>Stone Id </label>
          </div>
          <div className="form-group  col-md-4">
            <label>Weight</label>
          </div>
          <div className="form-group col-md-4">
          </div>
        </div>
        {value?.map((i, index) => {
          return (
            <div className="d-flex" key={index}>
              <div className="form-group mr-20">
                <input
                  type="text"
                  className="form-control  mb-4"
                  name="stoneId"
                  ref={focusNextRef}
                  placeholder="Enter stoneId"
                  required=""
                  value={i.stoneId}
                  onChange={(e) =>
                    onInputChange(i.id, e?.target?.name, e?.target?.value)
                  }
                />
              </div>
              <div className="form-group mr-20">
                <input
                  type="text"
                  className="form-control  mb-4"
                  name="weight"
                  onChange={(e) =>
                    onInputChange(i.id, e?.target?.name, e?.target?.value)
                  }
                  placeholder="Enter Weight"
                  required=""
                  onKeyPress={(e) => e.keyCode === 13 && appendRowHandler()}
                  ref={focusNextRef}
                  value={i.weight}
                />
              </div>

              <div className="form-group">
                <div onClick={() => removeHandler(i?.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="red" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="form-group">
        <button className="btn btn-success" id="append-btn" onClick={appendRowHandler}>
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
