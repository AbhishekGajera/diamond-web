import React, { useState, useEffect } from "react";
import useDebounce from "../../Hooks/useDebounce";
import { getStockById, updateStock } from "../../Services";
import useFocusNext from '../../Hooks/useFocusNext'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../Modal/index";


const RecieveForm = ({ partyList }) => {
  // party change handler for selectBox
  const [selectedParty, setselectedParty] = useState(partyList[0]?.id);
  const [stockDetail, setstockDetail] = useState([]);
  const [isOpenModel, setisOpenModel] = useState(false);
const [partyName, setpartyName] = useState([]);

  const focusNextRef = useFocusNext();

  const navigate = useNavigate();
  const modalClose = () => {
    setisOpenModel(false)
  }


  // onchange events save in state
  const [value, setvalue] = useState([
    {
      id: 0,
      stoneId: "",
      weight: "",
      isGetted: true
    },
  ]);

  // manage auto detect weight in debounce
  const debounced = useDebounce(value, 1000);

  // Effect for API call
  useEffect(() => {
    setpartyName(partyList[0]?.name)

    // Do fetch here...
    if (value) {
      const promiseArray = value?.map(async (i) => {
        if (!i?.isGetted) {
          try {
            const result = await getStockById(i?.stoneId);
            i.weight = result?.data?.weight;
            i.isGetted = true;
          } catch (error) {
            console.error(error)
          }
        }
        return i;
      });

      Promise.all(promiseArray).then((filteredData) => {
        setvalue(filteredData);
      });
      // Triggers when "debounced" changes
    }
  }, [debounced]);

  const onInputChange = (ids, name, values) => {
    const filteredData = value?.map((i) => {
      if (i?.id === ids) {
        i[name] = values;
        if (name === "stoneId") {
          i.isGetted = false;
        }
      }
      return i;
    });
    setvalue(filteredData);
  };

  const onSubmitHandler = () => {
    const id = toast.loading("Please wait...");
    var jangadDetail = [];
    const stockToUpdate = []
    const promiseArray = value?.map(async (i) => {
      const data = JSON.stringify({
        stock_type: 1,
        stone_id: i.stoneId,
        party: selectedParty,
        current_assign: selectedParty,
        weight: i.weight,
        status: 0, // status is default 0 for issue
      });

      try {
        stockToUpdate.push(updateStock(data))
        jangadDetail.push(JSON.parse(data))
        // await updateStock(data);
      } catch (error) {
        toast.error(`Stone id ${i.stoneId} not found`,{
          autoClose : 4000
        })
      }
      return i;
    });

    Promise.all(promiseArray).finally(() => {
      toast.update(id, { render: "data updated successfully", type: "success", isLoading: false, autoClose : 4000 });
      if (confirm("Print Jangad") == true) {
        setstockDetail(jangadDetail)
        setisOpenModel(true)
      }     
      // navigate('/stocklist')
    });

  };

  const appendRowHandler = () => {
    const uniq = 'id' + (new Date()).getTime();
    const data = {
      id: uniq,
      stoneId: "",
      weight: "",
      isGetted: true
    };

    setvalue([...value, data]);
  };

  const removeHandler = (id) => {
    const filterdData = value?.filter((i) => i?.id !== id);
    setvalue(filterdData);
  };
  return (
    <>
    <div>
      <div className="form-group">
        <label>Select Party</label>
        <select
          name="party"
          className="form-control  mb-4"
          onChange={(e) => setselectedParty(e?.target?.value)}
        >
          {partyList?.map((item) => {
            return <option value={item?.id}>{item?.name}</option>;
          })}
        </select>
      </div>
      <div>
        <div className="row">
          <div className="form-group  col-md-4">
            <label>Stone Id</label>
          </div>
          <div className="form-group  col-md-4">
            <label>Weight</label>
          </div>
          <div className="form-group col-md-4"></div>
        </div>
        {value &&
          value?.map((i) => {
            return (
              <div className="d-flex">
                <div className="form-group mr-20">
                  <input
                    type="text"
                    className="form-control  mb-4"
                    name="stoneId"
                    onChange={(e) =>
                      onInputChange(i.id, e?.target?.name, e?.target?.value)
                    }
                    placeholder="Enter stoneId"
                    required=""
                    value={i.stoneId}
                    ref={focusNextRef}
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
                    value={i.weight}
                    placeholder="Enter Weight"
                    required=""
                    ref={focusNextRef}
                    />
                </div>

                <div className="form-group">
                  <div onClick={() => removeHandler(i?.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="red"
                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="form-group">
        <button className="btn btn-success"  id="append-btn" onClick={appendRowHandler}>
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
     {isOpenModel &&
      <Modal show={isOpenModel} data={stockDetail} partyName={partyName} handleClose={modalClose} />
    } 
     </>
  );
};

export default RecieveForm;
