// Component Import
import React from "react";
import Head from "next/head";
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import authAPI from "@Components/utils/authAPI";
import { FB_PIXEL_ID } from "./fpixel";
import { useAmp } from "next/amp";

const SEO = ({ theme }) => {
  const isGTO = process.env.APP_BRAND == 'gto'
  const isAmp = useAmp()
  const router = useRouter()
  const routepath = router.asPath;
  // API call to get the SEO meta data from the DB
  let data = [];
  const [seodata, setseoData] = useState("")
  const [schemaorg, setschemaorg] = useState([])
  const [schemafaq, setschemafaq] = useState()
  const [clickcease, setclickcease] = useState(false)

  useEffect(() => {
    if (routepath == "/" || routepath == "/hotbets" || routepath == "/register") {
      !isAmp && !isGTO && renderScript()
    }
    async function getSeodata(params) {
      const body = {
        urlpath: params
      }
      const url = `${process.env.server}/seo/getseometa`
      const response = await authAPI(url, body, "POST", false);
      if (!response.error) {
        data = response.data.ERROBJ.ERRORCODE == "0" ? response.data.qGetSeo[0] : ""
        setschemaorg(data?.SCHEMA?.split("~"))
        setschemafaq(data?.SCHEMAFAQ)
        setseoData(data);
      }
    }
    let path = routepath.indexOf("blog") > -1 ? "/" + routepath.split("/")[1] : routepath
    getSeodata(path);
    return () => {
      setseoData("");
      document.getElementById("clickcease") && document.head.removeChild(document.getElementById("clickcease"))
    }
  }, [routepath]);

  // Apply the data to the page in the Head tags

  const renderScript = () => {
    if (document.getElementById("clickcease")) {

    } else {
      const script = document.createElement("script")
      var target = 'https://www.clickcease.com/monitor/stat.js';
      script.id = "clickcease"
      script.src = target;
      script.async = true
      script.type = 'text/javascript';
      var elem = document.head;
      elem.appendChild(script);
    }
  }
  return (
    <React.Fragment>
      <Head>
        <title>{seodata ? seodata.METATITLE : process.env.client.clientname}</title>
        <link rel="icon" type="image/x-icon" href={`/images/${process.env.APP_BRAND}/favicon.ico`}></link>
        <meta name="theme-color" content={theme.palette.secondary.main} />
        <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
        <meta name="description" content={seodata ? seodata.METADESC : ""} />

        <meta name="google-site-verification" content="ntLBNnazcBOnoNsRva6s8fv92pDXYBL8IqqqNzm-OFc" />
        <meta name="google-site-verification" content="rHtSakGDsnI-jRe2uge0mM03w50dFDYfUmDi-KJI-Nc" />
        <meta name="google-site-verification" content="puYHwQda1amP8oI7MIEtPJXu5KGn6X8v3B62qiuH-6g" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="MobileOptimized" content="320" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="google-site-verification" content="l9367DRtnRmPEL5XbkiPJxUX2HpYHC0Fntl1ZXmsSY8" />
        <meta name="google-site-verification" content="wXYLKScDKqTOgaHLRRv9FTD0dGwgfYekuNwW6H9ezt4" />

        <meta itemProp="name" content={seodata ? seodata.METATITLE : ""} />
        <meta itemProp="description" content={seodata ? seodata.METADESC : ""} />
        <meta name="robots" content={
          seodata ? seodata.NOFOLLOW == 1 ? 'noindex, nofollow' : 'follow,index' : ""
        } />
        <meta name="keywords" content={seodata ? seodata.METAKEYWORD : ""} />
        {
          process.env.APP_BRAND == 'eb' &&
          <meta name="facebook-domain-verification" content="n2xxay5kjssw02qglniuccm956yaz2" />
        }
        {/*<!-- Twitter Meta Tags -->*/}
        {
          seodata?.TWITTERMETA?.length > 0 &&
          <React.Fragment>
            {
              JSON.parse(seodata?.TWITTERMETA)?.url?.card > 0 &&
              <meta property="twitter:card" content={JSON.parse(seodata?.TWITTERMETA)?.card} />
            }
            {
              JSON.parse(seodata?.TWITTERMETA)?.creator?.length > 0 &&
              <meta property="twitter:creator" content={JSON.parse(seodata?.TWITTERMETA)?.creator} />
            }
            {
              JSON.parse(seodata?.TWITTERMETA)?.site?.length > 0 &&
              <meta property="twitter:site" content={JSON.parse(seodata?.TWITTERMETA)?.site} />
            }
            {
              JSON.parse(seodata?.TWITTERMETA)?.title?.length > 0 &&
              <meta property="twitter:title" content={JSON.parse(seodata?.TWITTERMETA)?.title} />
            }
            {
              JSON.parse(seodata?.TWITTERMETA)?.description?.length > 0 &&
              <meta property="twitter:description" content={JSON.parse(seodata?.TWITTERMETA)?.description} />
            }
            {
              JSON.parse(seodata?.TWITTERMETA)?.image?.length > 0 &&
              <meta property="twitter:image" content={JSON.parse(seodata?.TWITTERMETA)?.image} />
            }
            {
              JSON.parse(seodata?.TWITTERMETA)?.url?.length > 0 &&
              <meta property="twitter:url" content={JSON.parse(seodata?.TWITTERMETA)?.url} />
            }

          </React.Fragment>
        }

        {/*<!-- Facebook Meta Tags -->*/}
        {
          seodata?.FACEBOOKMETA?.length > 0 &&
          <React.Fragment>
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.url?.length > 0 &&
              <meta property="og:url" content={JSON.parse(seodata?.FACEBOOKMETA)?.url} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.title?.length > 0 &&
              <meta property="og:title" content={JSON.parse(seodata?.FACEBOOKMETA)?.title} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.type?.length > 0 &&
              <meta property="og:type" content={JSON.parse(seodata?.FACEBOOKMETA)?.type} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.title?.length > 0 &&
              <meta property="og:title" content={JSON.parse(seodata?.FACEBOOKMETA)?.title} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.description?.length > 0 &&
              <meta property="og:description" content={JSON.parse(seodata?.FACEBOOKMETA)?.description} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.image?.length > 0 &&
              <meta property="og:image" content={JSON.parse(seodata?.FACEBOOKMETA)?.image} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.articleauthor?.length > 0 &&
              <meta property="article:author" content={JSON.parse(seodata?.FACEBOOKMETA)?.articleauthor} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.articlesection?.length > 0 &&
              <meta property="article:section" content={JSON.parse(seodata?.FACEBOOKMETA)?.articlesection} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.publishTime?.length > 0 &&
              <meta property="article:published_time" content={JSON.parse(seodata?.FACEBOOKMETA)?.publishTime} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.tag?.length > 0 &&
              <meta property="article:tag" content={JSON.parse(seodata?.FACEBOOKMETA)?.tag} />
            }
            {
              JSON.parse(seodata?.FACEBOOKMETA)?.appID?.length > 0 &&
              <meta property="fb:app_id" content={JSON.parse(seodata?.FACEBOOKMETA)?.appID} />
            }
          </React.Fragment>
        }
        {
          seodata?.CANONCIAL?.length > 0 &&
          <link rel="canonical" href={seodata?.CANONCIAL} />
        }
        {
          !isAmp &&
          <React.Fragment>
            {
              schemaorg?.length > 0 &&
              schemaorg?.map((item, idx) =>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: `${item})` }}
                  key={`schema${idx}`}
                  nomodule
                />
              )
            }
            {
              schemafaq &&
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: `${schemafaq})` }}
                key={`schemaFAQ`}
                nomodule
              />
            }
            {
              FB_PIXEL_ID.length > 0 &&
              <noscript>
                <img
                  height="1"
                  width="1"
                  style={{ display: 'none' }}
                  src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                  alt={FB_PIXEL_ID}
                />
              </noscript>
            }
          </React.Fragment>
        }
      </Head>
      {
        !isAmp && !isGTO &&
        <noscript>
          <a href='https://www.clickcease.com' rel='nofollow'>
            <img src='https://monitor.clickcease.com/stats/stats.aspx' alt='ClickCease' />
          </a>
        </noscript>
      }
    </React.Fragment>
  );
};

export default SEO;