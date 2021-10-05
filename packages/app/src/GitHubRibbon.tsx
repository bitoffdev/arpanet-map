import styled from "styled-components";

const StyledRibbonAnchor = styled.a`
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;

  img {
    height: 149px;
    width: 149px;
  }
`;

const GitHubRibbon = (): React.ReactElement => (
  <StyledRibbonAnchor href="https://github.com/bitoffdev/arpanet-map">
    <img
      loading="lazy"
      src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
      alt="Fork me on GitHub"
      data-recalc-dims="1"
    />
  </StyledRibbonAnchor>
);

export default GitHubRibbon;
