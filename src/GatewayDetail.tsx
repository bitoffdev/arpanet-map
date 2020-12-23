import styled from "styled-components";
import { useEffect, useState } from "react";
import WBK from "wikibase-sdk";

// const WBK = require('wikibase-sdk');
const wdk = WBK({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql",
});

const StyledGatewayDetailDiv = styled.div`
  font-family: "Overpass";
  min-width: 300px;
  padding: 20px;
`;

type GatewayDetailProps = {
  gateway: any;
};

export default function GatewayDetail({ gateway }: GatewayDetailProps) {
  const [wikipediaUrl, setWikipediaUrl] = useState<string | null>(null);

  useEffect(() => {
    setWikipediaUrl(null);

    if (gateway.wikidataId == null) return;

    const url = wdk.getEntities({
      ids: [gateway.wikidataId],
      languages: ["en"],
    });

    fetch(url)
      .then((response: any) => response.json())
      .then(wdk.parse.wd.entities)
      .then((entities) => {
        console.log(entities);
        const e = entities[gateway.wikidataId];
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${e.sitelinks.enwiki}`;
        console.log(wikipediaUrl);
        setWikipediaUrl(wikipediaUrl);
      });
  }, [gateway]);

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
    </StyledGatewayDetailDiv>
  );
}
