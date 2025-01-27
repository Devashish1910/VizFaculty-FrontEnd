import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

//components
import TimeTableComponent from '../../components/Timetable/TimeTableComponent'
import EditTimeTableModel from '../../models/EditTimeTableModel';
import AddTimeTableModal from '../../models/AddTimeTableModal';

export default function Timetables() {
  const { data: timetables, isLoading, refetch } = useQuery(['timetables'], () => axios.get(`${process.env.REACT_APP_API_KEY}/api/timetables`, {
    headers: {
      authorization: `Bearer ${Cookies.get('token')}`,
    },
  }).then(res => res.data));
  console.log(timetables);
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      Day: "Monday",
      "10:30-11:30": "",
      "11:30-12:30 ": "",
      "1:00-2:00": "",
      "2:00-3:00": "",
      "3:15-4:15": "",
      "4:15-5:15": "",
    },
    {
      Day: "Tuesday",
      "10:30-11:30": "",
      "11:30-12:30 ": "",
      "1:00-2:00": "",
      "2:00-3:00": "",
      "3:15-4:15": "",
      "4:15-5:15": "",
    },
    {
      Day: "Wednesday",
      "10:30-11:30": "",
      "11:30-12:30 ": "",
      "1:00-2:00": "",
      "2:00-3:00": "",
      "3:15-4:15": "",
      "4:15-5:15": "",
    },
    {
      Day: "Thursday",
      "10:30-11:30": "",
      "11:30-12:30 ": "",
      "1:00-2:00": "",
      "2:00-3:00": "",
      "3:15-4:15": "",
      "4:15-5:15": "",
    },
    {
      Day: "Friday",
      "10:30-11:30": "",
      "11:30-12:30 ": "",
      "1:00-2:00": "",
      "2:00-3:00": "",
      "3:15-4:15": "",
      "4:15-5:15": "",
    },
    {
      Day: "Saturday",
      "10:30-11:30": "",
      "11:30-12:30 ": "",
      "1:00-2:00": "",
      "2:00-3:00": "",
      "3:15-4:15": "",
      "4:15-5:15": "",
    },
    {
      Day: "Sunday",
      "10:30-11:30": "",
      "11:30-12:30 ": "",
      "1:00-2:00": "",
      "2:00-3:00": "",
      "3:15-4:15": "",
      "4:15-5:15": "",
    },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);
  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;

          return newRow;
        })
      );
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h6 className="uppercase text-slate-700 mb-1 text-sm font-semibold">
                    TimeTables
                  </h6>
                  {/* <h2 className="text-white text-xl font-semibold">Expenditure vise</h2> */}
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <AddTimeTableModal refetch={refetch} />
                </div>
              </div>
            </div>
            { timetables?.ttCount<1 &&
              <div className='h-350-px items-center top-1/2 text-center'>No TimeTable Found, Add TimeTable By clicking "+ Add TimeTable" button</div>
            }
            { timetables?.ttCount>0  &&
              timetables?.timetables?.map( tt => (
              <TimeTableComponent editRow={handleEditRow} ttData={tt} refetch={refetch}/>
              ))
            }
          </div>
        </div>
        {/* <div className="w-full xl:w-11/12 min-lg:w-11/12 mb-12 xl:mb-0 px-4">
        </div>
        <div className="w-full xl:w-11/12 min-lg:w-11/12 mb-12 xl:mb-0 px-4">
        </div> */}
      </div>
    </>
  )
}
