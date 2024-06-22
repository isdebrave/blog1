import styled from "@emotion/styled";
import { CardItemType } from "components/card/CardItem";
import CardList from "components/card/CardList";
import Template from "components/common/Template";
import { graphql } from "gatsby";
import React from "react";
import { ContentWrapper } from "styles/index";
import { SiteType } from "types";

type IndexPageType = {
  data: {
    site: SiteType;
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: CardItemType;
        };
      }[];
    };
  };
};

const HomeWrapper = styled(ContentWrapper)`
  & > h1 {
    text-align: center;
    margin-bottom: 40px;
  }
`;

const IndexPage: React.FC<IndexPageType> = (props) => {
  const { title } = props.data.site.siteMetadata;
  const { edges } = props.data.allMarkdownRemark;

  return (
    <Template>
      <HomeWrapper>
        <h1>{title}</h1>
        <CardList edges={edges} />
      </HomeWrapper>
    </Template>
  );
};

export default IndexPage;

export const getHomeListData = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
  }
`;
