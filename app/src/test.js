const { NFTStorage, Blob, } =  require("nft.storage");
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ3MDk4OWIzN2JlMjExN2QwYWE2MGRCNmYyMzIzODQ5NTQzMjNiRDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNjA4NzY0NTU5NSwibmFtZSI6InRlc3QifQ.CSD7bSQgXEzLIP8eTKxqJLYYmVEHulNdIoMHgGUCn5c";
const client = new NFTStorage({
  token: apiKey,
  endpoint: new URL('http://localhost:8080/'),
});
client.store({
    name: "test name",
    description: "test description",
    image: new Blob([{}], "l.jpg", { type: "image/jpg" }),
  }).then((metadata) => {
  console.log(metadata.url);
  }).catch((err) => {
  console.log(err);
})