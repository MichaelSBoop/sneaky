import { encoded, translations } from "./data.js";

function decodeFields(data, template) {
  const exclude = ["groupId", "service", "formatSize", "ca"];
  const uniqueIdData = new Set();

  const decodedData = data.map((obj) => {
    const decodedObject = { ...obj };
    for (const field in obj) {
      if (field.endsWith("Id") && !exclude.includes(field)) {
        const value = obj[field];
        decodedObject[field] = template[value] || value;
      }
    }
    return decodedObject;
  });

  data.forEach((obj) => {
    for (const field in obj) {
      if (field.endsWith("Id") && obj[field] !== null) {
        uniqueIdData.add(obj[field]);
      }
    }
  });

  const decodedResult = [decodedData, [...uniqueIdData]];
  return decodedResult;
}

const decoded = decodeFields(encoded, translations);

console.log("Let's rock");
console.log(encoded, translations);

console.log(decoded);
