import axios from "axios";

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.URL}/v1/recipes`, {
    params: {
      search: ``,
      limit: 1,
    },
  });
  return {
    props: { recipes: res.data.data },
  };
}

function SSR({ recipes }) {
  return console.log(recipes);
  //   return <div className="container">{JSON.stringify(recipes)}</div>;
}

export default SSR;
