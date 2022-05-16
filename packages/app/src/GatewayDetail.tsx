import styled from "styled-components";
import { useEffect, useState } from "react";
import { GatewayType } from "arpanet-map";
import { getComputerModel, getPerson } from "./Data";
import { InfoTooltip } from "./InfoTooltip";
import WikipediaAnchor from "./WikipediaAnchor";
import { Address, gatewayFromId } from "./model";
import { FaLink } from "react-icons/fa";

const StyledAddressContainer = styled.div`
  background-color: #eee;
  border: 2px solid purple;
  border-radius: 10px;
  padding: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const StyledAddressHeader = styled.div`
  margin: 0px;
  padding: 10px;
  background-color: purple;
  color: white;
`;

const StyledAddressBody = styled.div`
  margin: 0px;
  padding: 10px;
`;

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
      <td>
        {person && (
          <WikipediaAnchor wikidataId={person.wikidataId}>
            {person.nickname}
          </WikipediaAnchor>
        )}
      </td>
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

const addrToJSX = (addr: Address) => {
  return (
    <StyledAddressContainer>
      <StyledAddressHeader>
        <a
          href={addr.reference.url}
          rel="noreferrer"
          target="_blank"
          style={{ textDecoration: "none", color: "white" }}
        >
          <FaLink /> Address from {addr.reference.name}
        </a>
      </StyledAddressHeader>
      <StyledAddressBody>
        <table>
          {addr.title1 != null && (
            <tr>
              <td>{addr.title1}</td>
            </tr>
          )}
          {addr.title2 != null && (
            <tr>
              <td>{addr.title2}</td>
            </tr>
          )}
          {addr.title3 != null && (
            <tr>
              <td>{addr.title3}</td>
            </tr>
          )}
          {addr.street != null && (
            <tr>
              <td>{addr.street}</td>
            </tr>
          )}
          <tr>
            <td>
              {addr.city}, {addr.state} {addr.postal_code}
            </td>
          </tr>
        </table>
      </StyledAddressBody>
    </StyledAddressContainer>
  );
};

export default function GatewayDetail({ gateway }: GatewayDetailProps) {
  const [statusReports, setStatusReports] = useState<Array<any>>([]);

  const gw = gatewayFromId(gateway.gatewayId);

  useEffect(() => {
    setStatusReports(() => []);

    const { gatewayId } = gateway;
    fetch("api/v1/statusReports.json")
      .then((response) => response.json())
      .then((body) => {
        return body.statusReports.filter(
          (statusReport: any) => statusReport.gateway === gatewayId
        );
      })
      .then(setStatusReports);
  }, [gateway]);

  return (
    <StyledGatewayDetailDiv>
      <h1>{gateway.name}</h1>
      <h2>{gw.long_name}</h2>
      <p>{gw.description}</p>
      {gw.addresses.map(addrToJSX)}

      {gateway.wikidataId && (
        <div style={{ marginTop: "15px" }}>
          <WikipediaAnchor wikidataId={gateway.wikidataId}>
            Wikipedia
          </WikipediaAnchor>
        </div>
      )}
      <h2>
        <span style={{ marginRight: "10px" }}>Status Reports</span>
        <InfoTooltip message="Between September 1971 (RFC 235) and August 1972 (RFC 376), BBN issued status reports as RFCs approximately every two weeks. These reports detail information about the network status of hosts connected to ARPANET." />
      </h2>
      {statusReports.length === 0 ? (
        <p>No status reports were found for this gateway.</p>
      ) : (
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
      )}
    </StyledGatewayDetailDiv>
  );
}
