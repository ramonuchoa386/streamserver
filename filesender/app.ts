import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";
import {
  IPlateRecognizerAPIResponse,
  IPlateRecognizerNOKResponse,
} from "./domain/plate-recognizer.interface";

dotenv.config();

const directory = process.env.SNAPSHOT_FOLDER;
const token = process.env.PLATE_RECOGNIZER_API_TOKEN;
const apiHost = process.env.API_HOST;

let lastFileModification: number | null = null;

async function sendFileToApi(directory: string, token: string) {
  const filePath = path.join(directory, "snapshot.jpg");
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File 'snapshot.jpg' not found in the directory.");
      return;
    }

    fs.stat(filePath, async (err, stats) => {
      if (err) {
        console.error("Error getting file stats:", err);
        return;
      }

      const currentModification = stats.mtimeMs;

      if (
        lastFileModification === null ||
        lastFileModification !== currentModification
      ) {
        lastFileModification = currentModification;

        const fileStream = fs.createReadStream(filePath);
        const formdata = new FormData();
        formdata.append("upload", fileStream, {
          filename: "snapshot.jpg",
        });
        formdata.append("regions", "br");

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formdata,
        };

        await fetch(
          "https://api.platerecognizer.com/v1/plate-reader/",
          requestOptions
        )
          .then((res) => res.json())
          .then(
            async (
              result: IPlateRecognizerAPIResponse | IPlateRecognizerNOKResponse
            ) => {
              console.log("Plate Recognizer OCR API response: ", result);

              if ("status_code" in result) {
                const { detail, status_code } = result;

                switch (status_code) {
                  case 403:
                    console.error(`Plate Recognizer OCR API error: ${detail}`);

                    process.exitCode = 1;
                    process.exit();
                    break;
                  case 429:
                    console.error(`Plate Recognizer OCR API error: ${detail}`);

                    await new Promise((resolve) => {
                      setTimeout(resolve, 1000);
                    });
                    break;
                  default:
                    break;
                }
              } else {
                const { results } = result;

                if (results.length > 0) {
                  const { plate } = results[0];

                  console.log("Plate: ", plate);

                  const requestOptions = {
                    method: "GET",
                  };

                  await fetch(
                    `http://${apiHost}:8080/api/veiculos/placa/${plate}`,
                    requestOptions
                  )
                    .then((response) => response.json())
                    .then((result) =>
                      console.log("consulta se carro esta cadastrado: ", result)
                    )
                    .catch((error) => console.error(error));
                  // pegar o plate no result
                  // consultar o banco de dados
                  // // se existe
                  // // req para mqtt
                } else {
                  console.log("Nenhum carro no corredor.");
                }
              }
            }
          )
          .catch((error) =>
            console.error("Plate Recognizer OCR API error: ", error)
          );
      } else {
        console.log("The file has not been modified since the last check.");
      }
    });
  });
}

function main() {
  if (directory && token) {
    setInterval(() => {
      sendFileToApi(directory, token);
    }, 3000);
  } else {
    console.error('Variáveis "directory" e "token" não estão configuradas.');

    process.exitCode = 1;
    process.exit();
  }
}

main();
