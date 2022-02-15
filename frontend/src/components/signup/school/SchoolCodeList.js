import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SchoolCodeDetail from "components/signup/school/SchoolCodeDetail";
import { getSchool } from "api/user";
import { errorAlert } from "modules/alert";

const SchoolCodeListContainer = styled.div`
  max-height: 70vh;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #adb5bd;
    border-radius: 10px;
  }
`;

const SchoolCodeList = ({ schoolName, onComplate }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setData(null);
      setLoading(true);
      try {
        // const response = await axios.get(
        //   `https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=100`
        // );

        getSchool({
          Type: "JSON",
          pIndex: 1,
          pSize: 100,
          SCHUL_NM: schoolName,
          KEY: "2d2bd92546704cdaab894c198821d72b",
        }).then((response) => setData(response.data.schoolInfo[1].row));
      } catch (e) {
        errorAlert(e.response.status, "학교목록을 불러오지 못했습니다.");
      }
      setLoading(false);
    };
    fetchData();
  }, [schoolName]);

  if (loading) {
    return <SchoolCodeListContainer>로딩중...</SchoolCodeListContainer>;
  }

  if (!data) {
    return <SchoolCodeListContainer></SchoolCodeListContainer>;
  }

  return (
    <SchoolCodeListContainer>
      {data.map((school) => (
        <SchoolCodeDetail
          key={school.SD_SCHUL_CODE}
          data={school}
          onClick={onComplate}
        />
      ))}
    </SchoolCodeListContainer>
  );
};

export default SchoolCodeList;
