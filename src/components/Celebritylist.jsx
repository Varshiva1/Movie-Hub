import { Link } from "react-router-dom";
import Card from "./Card";
import { useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function List() {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const onNext = () => {
    setPageNum(pageNum + 1);
  };
  const onPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=7af0a3ff53ab2ff0f3f224bb58d5b777&page=${pageNum}'`
      )
      .then((res) => {
        console.log(res.data.results, "result");
        setList(res.data.results);
      });
  }, [pageNum]);

  return (
    <div className="w-4/5 m-auto flex flex-col gap-10 py-12">
      <h2 className="text-5xl font-bold text-center text-white">Trending </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
        {list.map((celebs) => (
          // console.log(celebs.profile_path,"path")
          <Card key={celebs.profile_path} celebs={celebs} />
        ))}
      </div>
      <Pagination
        pageNumProp={pageNum}
        onNextProp={onNext}
        onPrevProp={onPrev}
      />
    </div>
  );
}

export default List;
