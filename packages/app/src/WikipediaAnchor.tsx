import WBK from "wikibase-sdk";

const wdk = WBK({
  instance: "https://www.wikidata.org",
  sparqlEndpoint: "https://query.wikidata.org/sparql",
});

type WikipediaAnchorProps = {
  wikidataId: string;
};

const WikipediaAnchor = ({
  children,
  wikidataId,
}: React.PropsWithChildren<WikipediaAnchorProps>): React.ReactElement => {
  const lazyRedirect = () => {
    if (wikidataId == null) return;

    console.log(wikidataId);

    const url = wdk.getEntities({
      ids: [wikidataId],
      // TODO Allow language to be customized.
      languages: ["en"],
    });

    fetch(url)
      .then((response) => response.json())
      .then(wdk.parse.wd.entities)
      .then((entities) => {
        const e = entities[wikidataId];
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${e.sitelinks.enwiki}`;
        const newWindow = window.open(wikipediaUrl, "_blank");
        if (newWindow) newWindow.focus();
        else console.error("Could not open window");
      });
  };

  return wikidataId == null ? (
    <span>{children}</span>
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" onClick={() => lazyRedirect()}>
      {children}
    </a>
  );
};

export default WikipediaAnchor;
