import React from "react";

export default function Pagination({totalPosts,postPerPage,setCurrentPage}) {
    let pages=[];

    for(let i=1;i<=Math.ceil(totalPosts/postPerPage);i++){ 
        pages.push(i)

    }

    return(
        <div>
          {pages.map((page,index)=>{
            return <button key={index} onClick={()=>setCurrentPage(page)}>{page}</button>
          })}
        </div>


    )
}