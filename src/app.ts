import buildServer from "./server";

const server = buildServer();

async function main() {
  try {
    await server.listen({ port: 3000 }, (err:any, address:any) => {
      if (err) throw err
    })

    console.log(`Server ready at http://localhost:3000`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
