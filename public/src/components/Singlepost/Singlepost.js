import styles from "./Singlepost.module.css";
import one from "../../media/one.png";

const Singlepost = () => {
  return (
    <div className={styles["post-main"]}>
      <div className={styles["post-sub"]}>
        <div className={styles["title-section"]}>
          <div className={styles["title"]}>
            <h1>
              The HubSpot Blog's 2023 Marketing Strategy & Trends Report: Data
              from 1,200+ Global Marketers
            </h1>
            <p className={styles["desc"]}>
              Discover the trends and winning tactics brands should focus on in
              2023, and what will change after 2022 with data from 1,200+ global
              B2B and B2C marketers.
            </p>
            <p className={styles["name"]}>
              Written by: <span>Shuvra Chakrabarty</span>
            </p>
            <div className={styles["date"]}>
              <p>Published: 05/01/23</p>
              <p>Updated: 05/01/23</p>
              <div className={styles["views"]}>
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios/50/visible--v1.png"
                  alt="visible--v1"
                />
                <p>200</p>
              </div>
            </div>
          </div>
          <div className={styles["image-section"]}>
            <img width="500px" height="400px" src={one} alt="images"></img>
            <p>
              Following outrage over the election of his close aide Sanjay Singh
              as president on December 21, former WFI chief and BJP MP Brij
              Bhushan Sharan Singh said he had nothing to do with the sports
              body any longer and was “done with wrestling”. (PTI)
            </p>
          </div>
        </div>
      </div>
      <div className={styles["text-section"]}>
        <p>
          1. Use deeper data to know the ins and outs of your audience. Go
          beyond basic demographic information - it’s crucial to know their
          interests and hobbies, how they like to shop, where they consume
          media, the online communities they are part of, the challenges they
          face, and the social causes they care about. 2. Always plan to pivot.
          From pandemics to political turmoil – and now a looming recession –
          the last few years have been a roller coaster for brands and consumers
          alike. Not only did over half of marketers pivot in 2021, 83% of those
          who pivoted changed course two to four times in one year. We also
          found that 20% of marketers have already pivoted due to the potential
          recession. Chances are 2023 will continue to see shifts around this.
          Ultimately, you need a plan for when things go off course. Will you
          increase your marketing budget? Will you cut down on marketing
          channels? How will you adapt your messaging to resonate with
          consumers' evolving experiences? Most importantly, do you have the
          data you need to guide your decisions? While the two strategies above
          reflect the broad findings in this report, let’s dive more
          specifically into the top trends you can expect to see in 2023,
          starting with the biggest changes marketers are seeing in their
          industry this year. Marketers agree that their industry changed
          drastically in the past few years, so let’s take a look at the top
          changes they saw from 2021 to 2022 – and what could be coming in 2023:
          What Changed in Marketing This Year More marketers have made pivots
          part of their plan. Data-informed marketing strategies have become
          vital. More brands aim to create content that reflects their values.
          Marketers increasingly use CRMs to track and organize data. Focusing
          on customer experiences bridges the gap between service and marketing.
          Social media DM strategies are growing in popularity. Building online
          communities around your brand is becoming critical to engagement.
          While we discussed some of these strategies an trends in our 2022
          Report, it's worth noting that we're seeing more emphasis on
          data-based decision-making, agile marketing, as well as social media
          brand-building (which often majorly contributes to the fast-paced
          tactics and pivots needed in the marketing industry each day). All in
          all, more marketers are speeding up processes and tactics to meet the
          digital, hyper-connected world we're existing in today. Below, we'll
          discuss a few of these items in more depth. But, we'll also continue
          to release more deep-dive data content to help you meet all of these
          changing strategies with success. The Top Marketing Trends of 2023
          Short-form video will see the most growth in 2023 Influencer marketing
          will continue to grow its high ROI. Branded social media DM tactics
          are growing. Website SEO continues to shine Marketers will continue to
          humanize their brands. Marketers will benefit from data in 2023. The
          top trends marketers are currently leveraging are short-form video,
          mobile-friendly web design, creating content that reflects their
          brand’s values, and using social media DMs for customer service. Not
          far behind are SEO, mobile messaging, influencer marketing, and
          selling products directly in social apps. what trends are marketers
          leveraging 1. Short-form video will see the most growth in 2023 Not
          only is short-form video the most popular trend among marketers, with
          one-third using it, but it’s also the most effective and has the
          highest ROI. On top of all that, short-form video will see the most
          growth of any trend in 2023, with marketers planning to invest more in
          it than any other trend. 90% of marketers using short-form video will
          increase or maintain their investment next year, and 21% of marketers
          plan to leverage short-form video for the first time in 2023, also the
          highest of any trend. which marketing trend has the highest ROI 2.
          Influencer marketing will continue to grow its high ROI. Over 1 in 4
          marketers currently leverage influencer marketing and it offers the
          2nd highest ROI of any trend. Luckily it can be leveraged with
          short-form video to take advantage of both of the highest ROI trends
          at the same time! Influencer marketing will also see significant
          growth in 2023 with 17% of marketers planning to invest in it for the
          first time, the 2nd highest of any trend. Influencer marketing also
          comes in second for the trend marketers plan to invest in more than
          any other in 2023 and 89% of marketers using it will increase or
          maintain their investment next year. which trend will marketers invest
          in On top of all that, our consumer trends survey shows that 33% of
          Gen Zers have bought a product based on an influencer’s recommendation
          in the past three months. And when they’re making purchase decisions,
          Gen Z says influencer recommendations are more important than recs
          from their friends and family.
        </p>
      </div>
    </div>
  );
};

export default Singlepost;
