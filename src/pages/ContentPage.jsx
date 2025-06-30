// import React from "react";

// const ContentPage = ({data}) =>
// {
// 	return (
// 		<div>
// 			<h1>{data.title}</h1>
// 			<p>{data.content}</p>
// 		</div>
// 	);
// };

// // export default ContentPage;

import { useParams } from "react-router-dom";

function ContentPage({ data }) {
  const { id } = useParams();      // Uses useParams(); to extract the id in ContentPage
  const object = data.find(item => item.id === id);

  if (!object) return <p>Content not found.</p>;

  return (
    <div>
      <h1>{object.title}</h1>
      <p>{object.content}</p>
    </div>
  );
}

export default ContentPage;
