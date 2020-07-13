async function ReadFile() {
  const data = await Deno.readTextFile("hello.txt");
  console.log(data);
}

for await (const dirEntry of Deno.readDir(".")) {
  console.log(dirEntry.name);
}

await ReadFile();
