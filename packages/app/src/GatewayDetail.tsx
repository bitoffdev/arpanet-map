import styled from "styled-components";
import { useEffect, useState } from "react";
import WBK from "wikibase-sdk";
import { GatewayType } from "arpanet-map";
import { getComputerModel, getPerson } from "./Data";

// const WBK = require('wikibase-sdk');
const wdk = WBK({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql",
});

const StyledTable = styled.table`
  table,
  th,
  td {
    border: 1px solid black;
  }

  th,
  td {
    padding: 5px;
  }
`;

const StyledGatewayDetailDiv = styled.div`
  font-family: "Overpass";
  min-width: 300px;
  max-width: 700px;
  padding: 20px;
`;

type GatewayDetailProps = {
  // versionId: number;
  gateway: GatewayType;
};

const StatusReportRow = ({ statusReport }: { statusReport: any }) => {
  const [person, setPerson] = useState<any | null>(null);
  const [computerModel, setComputerModel] = useState<any | null>(null);

  useEffect(() => {
    getPerson(statusReport.obtained_from).then(setPerson);
    getComputerModel(statusReport.computer_model).then(setComputerModel);
  }, [statusReport]);

  return (
    <tr>
      <td>{statusReport.address}</td>
      <td>{computerModel && computerModel.name}</td>
      <td>{person && person.nickname}</td>
      <td>
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://www.rfc-editor.org/rfc/rfc${statusReport.rfc}.txt`}
        >
          {statusReport.rfc}
        </a>
      </td>
    </tr>
  );
};

export default function GatewayDetail({ gateway }: GatewayDetailProps) {
  const [wikipediaUrl, setWikipediaUrl] = useState<string | null>(null);
  const [statusReports, setStatusReports] = useState<Array<any>>([]);
  // const [computers, setComputers] = useState<Array<string>>([]);

  // const getComputers = (versionId, gatewayId) => {

  // };

  useEffect(() => {
    setWikipediaUrl(null);

    // it seems like we need to unpack wikidataId for typescript to acknowledge the nullish check
    const { gatewayId, wikidataId } = gateway;
    if (wikidataId == null) return;

    const url = wdk.getEntities({
      ids: [gateway.wikidataId],
      languages: ["en"],
    });

    fetch(url)
      .then((response) => response.json())
      .then(wdk.parse.wd.entities)
      .then((entities) => {
        console.log(entities);
        const e = entities[wikidataId];
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${e.sitelinks.enwiki}`;
        console.log(wikipediaUrl);
        setWikipediaUrl(wikipediaUrl);
      });

    console.log(gatewayId);

    fetch("api/v1/statusReports.json")
      .then((response) => response.json())
      .then((body) => {
        return body.statusReports.filter(
          (statusReport: any) => statusReport.gateway === gatewayId
        );
      })
      .then(setStatusReports);
  }, [gateway]);

  // statusReports.forEach(async r => console.log(await getPerson(r.obtained_from)));

  return (
    <StyledGatewayDetailDiv>
      <h1>{gateway.name}</h1>
      <h2>{gateway.longName}</h2>
      {gateway.address && <p>{gateway.address}</p>}
      {wikipediaUrl && (
        <p>
          <a href={wikipediaUrl}>Wikipedia</a>
        </p>
      )}
      <h2>Status Reports</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Address</th>
            <th>Model</th>
            <th>Obtained From</th>
            <th>RFC</th>
          </tr>
        </thead>
        <tbody>
          {statusReports.map((statusReport) => (
            <StatusReportRow
              statusReport={statusReport}
              key={statusReport.id}
            ></StatusReportRow>
          ))}
        </tbody>
      </StyledTable>
    </StyledGatewayDetailDiv>
  );
}
