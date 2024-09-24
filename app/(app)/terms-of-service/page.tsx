"use client";
import React, { useState } from "react";
import "./TermsOfUse.css";

const TermsOfUsePage = () => {
  const [highlightedSection, setHighlightedSection] = useState<string | null>(
    null
  );
  const handleScrollToSection = (sectionId: string) => {
    setHighlightedSection(sectionId);
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setHighlightedSection(null), 1500); // Remove highlight after 3 seconds
    }
  };

  return (
    <div className="terms-container">
      <div className="terms-title">
        <strong>TERMS OF USE</strong>
      </div>

      <div className="terms-updated">
        <strong>Last updated September 21, 2024</strong>
      </div>

      <div className="terms-content">
        <h1 className="terms-heading">AGREEMENT TO OUR LEGAL TERMS</h1>
        <p>
          We are <strong>Diplomat</strong> ("<strong>Company</strong>", "
          <strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>"),
          a company registered in Nevada, United States, located at 1411 Robin
          St, Las Vegas, NV 89106.
        </p>

        <p>
          Our website enables users to connect and register for Model UN
          tournaments seamlessly.
        </p>

        <p>
          These Legal Terms constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity ("
          <strong>you</strong>"), and <strong>Diplomat</strong>, concerning your
          access to and use of the Services. You agree that by accessing the
          Services, you have read, understood, and agreed to be bound by all of
          these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS,
          THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
          DISCONTINUE USE IMMEDIATELY.
        </p>

        <p>
          Supplemental terms and conditions or documents that may be posted on
          the Services from time to time are hereby expressly incorporated
          herein by reference. We reserve the right, in our sole discretion, to
          make changes or modifications to these Legal Terms at any time and for
          any reason. We will alert you about any changes by updating the "Last
          updated" date of these Legal Terms, and you waive any right to receive
          specific notice of each such change. It is your responsibility to
          periodically review these Legal Terms to stay informed of updates. You
          will be subject to, and will be deemed to have been made aware of and
          to have accepted, the changes in any revised Legal Terms by your
          continued use of the Services after the date such revised Legal Terms
          are posted.
        </p>

        <p>
          All users who are minors in the jurisdiction in which they reside
          (generally under the age of 18) must have the permission of, and be
          directly supervised by, their parent or guardian to use the Services.
          If you are a minor, you must have your parent or guardian read and
          agree to these Legal Terms prior to you using the Services.
        </p>

        <p>
          We recommend that you print a copy of these Legal Terms for your
          records.
        </p>

        <h1 className="terms-heading">TABLE OF CONTENTS</h1>
        <ul className="terms-list">
          <li>
            <a
              onClick={() => handleScrollToSection("services")}
              href="#services"
            >
              1. OUR SERVICES
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("ip")} href="#ip">
              2. INTELLECTUAL PROPERTY RIGHTS
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("userreps")}
              href="#userreps"
            >
              3. USER REPRESENTATIONS
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("userreg")} href="#userreg">
              4. USER REGISTRATION
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("prohibited")}
              href="#prohibited"
            >
              5. PROHIBITED ACTIVITIES
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("ugc")} href="#ugc">
              6. USER GENERATED CONTRIBUTIONS
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("license")} href="#license">
              7. CONTRIBUTION LICENSE
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("socialmedia")}
              href="#socialmedia"
            >
              8. SOCIAL MEDIA
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("advertisers")}
              href="#advertisers"
            >
              9. ADVERTISERS
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("sitemanage")}
              href="#sitemanage"
            >
              10. SERVICES MANAGEMENT
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("ppyes")} href="#ppyes">
              11. PRIVACY POLICY
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("ppno")} href="#ppno">
              12. TERM AND TERMINATION
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("modifications")}
              href="#modifications"
            >
              13. MODIFICATIONS AND INTERRUPTIONS
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("law")} href="#law">
              14. GOVERNING LAW
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("disputes")}
              href="#disputes"
            >
              15. DISPUTE RESOLUTION
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("corrections")}
              href="#corrections"
            >
              16. CORRECTIONS
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("disclaimer")}
              href="#disclaimer"
            >
              17. DISCLAIMER
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("liability")}
              href="#liability"
            >
              18. LIMITATIONS OF LIABILITY
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("indemnification")}
              href="#indemnification"
            >
              19. INDEMNIFICATION
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("userdata")}
              href="#userdata"
            >
              20. USER DATA
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("electronic")}
              href="#electronic"
            >
              21. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
            </a>
          </li>

          <li>
            <a
              onClick={() => handleScrollToSection("california")}
              href="#california"
            >
              22. CALIFORNIA USERS AND RESIDENTS
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("misc")} href="#misc">
              23. MISCELLANEOUS
            </a>
          </li>

          <li>
            <a onClick={() => handleScrollToSection("contact")} href="#contact">
              24. CONTACT US
            </a>
          </li>
        </ul>

        <h1
          id="services"
          className={`terms-heading ${
            highlightedSection === "services" ? "highlight" : ""
          }`}
        >
          1. OUR SERVICES
        </h1>

        <p>
          The information provided when using the Services is not intended for
          distribution to or use by any person or entity in any jurisdiction or
          country where such distribution or use would be contrary to law or
          regulation or which would subject us to any registration requirement
          within such jurisdiction or country. Accordingly, those persons who
          choose to access the Services from other locations do so on their own
          initiative and are solely responsible for compliance with local laws,
          if and to the extent local laws are applicable.
        </p>

        <p>
          The Services are not tailored to comply with industry-specific
          regulations (Health Insurance Portability and Accountability Act
          (HIPAA), Federal Information Security Management Act (FISMA), etc.),
          so if your interactions would be subjected to such laws, you may not
          use the Services. You may not use the Services in a way that would
          violate the Gramm-Leach-Bliley Act (GLBA).
        </p>

        <h1
          id="ip"
          className={`terms-heading ${
            highlightedSection === "ip" ? "highlight" : ""
          }`}
        >
          2. INTELLECTUAL PROPERTY RIGHTS
        </h1>

        <h2 className="terms-subheading">Our intellectual property</h2>
        <p>
          We are the owner or the licensee of all intellectual property rights
          in our Services, including all source code, databases, functionality,
          software, website designs, audio, video, text, photographs, and
          graphics in the Services (collectively, the "Content"), as well as the
          trademarks, service marks, and logos contained therein (the "Marks").
        </p>

        <p>
          Our Content and Marks are protected by copyright and trademark laws
          (and various other intellectual property rights and unfair competition
          laws) and treaties in the United States and around the world.
        </p>

        <p>
          The Content and Marks are provided in or through the Services "AS IS"
          for your personal, non-commercial use or internal business purpose
          only.
        </p>

        <h2 className="terms-subheading">Your use of our Services</h2>
        <p>
          Subject to your compliance with these Legal Terms, including the "
          <a href="#prohibited">PROHIBITED ACTIVITIES</a>" section below, we
          grant you a non-exclusive, non-transferable, revocable license to:
        </p>

        <ul className="terms-list">
          <li>access the Services; and</li>

          <li>
            download or print a copy of any portion of the Content to which you
            have properly gained access.
          </li>
        </ul>

        <p>
          solely for your personal, non-commercial use or internal business
          purpose.
        </p>

        <p>
          Except as set out in this section or elsewhere in our Legal Terms, no
          part of the Services and no Content or Marks may be copied,
          reproduced, aggregated, republished, uploaded, posted, publicly
          displayed, encoded, translated, transmitted, distributed, sold,
          licensed, or otherwise exploited for any commercial purpose
          whatsoever, without our express prior written permission.
        </p>

        <p>
          If you wish to make any use of the Services, Content, or Marks other
          than as set out in this section or elsewhere in our Legal Terms,
          please address your request to: __________. If we ever grant you the
          permission to post, reproduce, or publicly display any part of our
          Services or Content, you must identify us as the owners or licensors
          of the Services, Content, or Marks and ensure that any copyright or
          proprietary notice appears or is visible on posting, reproducing, or
          displaying our Content.
        </p>

        <p>
          We reserve all rights not expressly granted to you in and to the
          Services, Content, and Marks.
        </p>

        <p>
          Any breach of these Intellectual Property Rights will constitute a
          material breach of our Legal Terms and your right to use our Services
          will terminate immediately.
        </p>

        <h2 className="terms-subheading">Your submissions</h2>
        <p>
          Please review this section and the "
          <a href="#prohibited">PROHIBITED ACTIVITIES</a>" section carefully
          prior to using our Services to understand the (a) rights you give us
          and (b) obligations you have when you post or upload any content
          through the Services.
        </p>

        <p>
          <strong>Submissions:</strong> By directly sending us any question,
          comment, suggestion, idea, feedback, or other information about the
          Services ("Submissions"), you agree to assign to us all intellectual
          property rights in such Submission. You agree that we shall own this
          Submission and be entitled to its unrestricted use and dissemination
          for any lawful purpose, commercial or otherwise, without
          acknowledgment or compensation to you.
        </p>

        <p>
          <strong>You are responsible for what you post or upload:</strong> By
          sending us Submissions through any part of the Services you:
        </p>

        <ul className="terms-list">
          <li>
            confirm that you have read and agree with our "
            <a href="#prohibited">PROHIBITED ACTIVITIES</a>" and will not post,
            send, publish, upload, or transmit through the Services any
            Submission that is illegal, harassing, hateful, harmful, defamatory,
            obscene, bullying, abusive, discriminatory, threatening to any
            person or group, sexually explicit, false, inaccurate, deceitful, or
            misleading;
          </li>

          <li>
            to the extent permissible by applicable law, waive any and all moral
            rights to any such Submission;
          </li>

          <li>
            warrant that any such Submission are original to you or that you
            have the necessary rights and licenses to submit such Submissions
            and that you have full authority to grant us the above-mentioned
            rights in relation to your Submissions; and
          </li>

          <li>
            warrant and represent that your Submissions do not constitute
            confidential information.
          </li>
        </ul>
        <p>
          You are solely responsible for your Submissions and you expressly
          agree to reimburse us for any and all losses that we may suffer
          because of your breach of (a) this section, (b) any third party’s
          intellectual property rights, or (c) applicable law.
        </p>

        <h1
          id="userreps"
          className={`terms-heading ${
            highlightedSection === "userreps" ? "highlight" : ""
          }`}
        >
          3. USER REPRESENTATIONS
        </h1>
        <p>By using the Services, you represent and warrant that:</p>

        <ul className="terms-list">
          <li>
            all registration information you submit will be true, accurate,
            current, and complete;
          </li>

          <li>
            you will maintain the accuracy of such information and promptly
            update such registration information as necessary;
          </li>

          <li>
            you have the legal capacity and you agree to comply with these Legal
            Terms;
          </li>

          <li>
            you are not a minor in the jurisdiction in which you reside, or if a
            minor, you have received parental permission to use the Services;
          </li>

          <li>
            you will not access the Services through automated or non-human
            means, whether through a bot, script or otherwise;
          </li>

          <li>
            you will not use the Services for any illegal or unauthorized
            purpose; and
          </li>

          <li>
            your use of the Services will not violate any applicable law or
            regulation.
          </li>
        </ul>

        <p>
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Services
          (or any portion thereof).
        </p>

        <h1
          id="userreg"
          className={`terms-heading ${
            highlightedSection === "userreg" ? "highlight" : ""
          }`}
        >
          4. USER REGISTRATION
        </h1>
        <p>
          You may be required to register with the Services. You agree to keep
          your password confidential and will be responsible for all use of your
          account and password. We reserve the right to remove, reclaim, or
          change a username you select if we determine, in our sole discretion,
          that such username is inappropriate, obscene, or otherwise
          objectionable.
        </p>

        <h1
          id="prohibited"
          className={`terms-heading ${
            highlightedSection === "prohibited" ? "highlight" : ""
          }`}
        >
          5. PROHIBITED ACTIVITIES
        </h1>
        <p>
          You may not access or use the Services for any purpose other than that
          for which we make the Services available. The Services may not be used
          in connection with any commercial endeavors except those that are
          specifically endorsed or approved by us.
        </p>

        <p>As a user of the Services, you agree not to:</p>

        <ul className="terms-list">
          <li>
            Systematically retrieve data or other content from the Services to
            create or compile, directly or indirectly, a collection,
            compilation, database, or directory without written permission from
            us.
          </li>

          <li>
            Make any unauthorized use of the Services, including collecting
            usernames and/or email addresses of users by electronic or other
            means for the purpose of sending unsolicited email, or creating user
            accounts by automated means or under false pretenses.
          </li>

          <li>
            Use a buying agent or purchasing agent to make purchases on the
            Services.
          </li>

          <li>
            Use the Services to advertise or offer to sell goods and services.
          </li>

          <li>
            Circumvent, disable, or otherwise interfere with security-related
            features of the Services, including features that prevent or
            restrict the use or copying of any Content or enforce limitations on
            the use of the Services and/or the Content contained therein.
          </li>

          <li>Engage in unauthorized framing of or linking to the Services.</li>

          <li>
            Trick, defraud, or mislead us and other users, especially in any
            attempt to learn sensitive account information such as user
            passwords.
          </li>

          <li>
            Make improper use of our support services or submit false reports of
            abuse or misconduct.
          </li>

          <li>
            Engage in any automated use of the system, such as using scripts to
            send comments or messages, or using any data mining, robots, or
            similar data gathering and extraction tools.
          </li>

          <li>
            Interfere with, disrupt, or create an undue burden on the Services
            or the networks or services connected to the Services.
          </li>

          <li>
            Attempt to impersonate another user or person or use the username of
            another user.
          </li>

          <li>Sell or otherwise transfer your profile.</li>

          <li>
            Use any information obtained from the Services in order to harass,
            abuse, or harm another person.
          </li>

          <li>
            Decipher, decompile, disassemble, or reverse engineer any of the
            software comprising or in any way making up a part of the Services.
          </li>

          <li>
            Attempt to bypass any measures of the Services designed to prevent
            or restrict access to the Services, or any portion of the Services.
          </li>

          <li>
            Harass, annoy, intimidate, or threaten any of our employees or
            agents engaged in providing any portion of the Services to you.
          </li>

          <li>
            Delete the copyright or other proprietary rights notice from any
            Content.
          </li>

          <li>
            Copy or adapt the Services' software, including but not limited to
            Flash, PHP, HTML, JavaScript, or other code.
          </li>

          <li>
            Upload or transmit (or attempt to upload or to transmit) viruses,
            Trojan horses, or other material, including excessive use of capital
            letters and spamming (continuous posting of repetitive text), that
            interferes with any party’s uninterrupted use and enjoyment of the
            Services or modifies, impairs, disrupts, alters, or interferes with
            the use, features, functions, operation, or maintenance of the
            Services.
          </li>

          <li>
            Upload or transmit (or attempt to upload or to transmit) any
            material that acts as a passive or active information collection or
            transmission mechanism, including without limitation, clear graphics
            interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or
            other similar devices (sometimes referred to as "spyware" or
            "passive collection mechanisms" or "pcms").
          </li>

          <li>
            Except as may be the result of standard search engine or Internet
            browser usage, use, launch, develop, or distribute any automated
            system, including without limitation, any spider, robot, cheat
            utility, scraper, or offline reader that accesses the Services, or
            using or launching any unauthorized script or other software.
          </li>

          <li>
            Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
            Services.
          </li>

          <li>
            Use the Services in a manner inconsistent with any applicable laws
            or regulations.
          </li>
        </ul>

        {/* Here is where you ended off at, continue from here to format and edit */}

        <h1
          id="ugc"
          className={`terms-heading ${
            highlightedSection === "ugc" ? "highlight" : ""
          }`}
        >
          6. USER GENERATED CONTRIBUTIONS
        </h1>
        <p>
          The Services may invite you to chat, contribute to, or participate in
          blogs, message boards, online forums, and other functionality, and may
          provide you with the opportunity to create, submit, post, display,
          transmit, perform, publish, distribute, or broadcast content and
          materials to us or on the Services, including but not limited to text,
          writings, video, audio, photographs, graphics, comments, suggestions,
          or personal information or other material (collectively,
          "Contributions"). Contributions may be viewable by other users of the
          Services and through third-party websites. As such, any Contributions
          you transmit may be treated as non-confidential and non-proprietary.
          When you create or make available any Contributions, you thereby
          represent and warrant that:
        </p>

        <ul className="terms-list">
          <li>
            The creation, distribution, transmission, public display, or
            performance, and the accessing, downloading, or copying of your
            Contributions do not and will not infringe the proprietary rights,
            including but not limited to the copyright, patent, trademark, trade
            secret, or moral rights of any third party.
          </li>
          <li>
            You are the creator and owner of or have the necessary licenses,
            rights, consents, releases, and permissions to use and to authorize
            us, the Services, and other users of the Services to use your
            Contributions in any manner contemplated by the Services and these
            Legal Terms.
          </li>
          <li>
            You have the written consent, release, and/or permission of each and
            every identifiable individual person in your Contributions to use
            the name or likeness of each and every such identifiable individual
            person to enable inclusion and use of your Contributions in any
            manner contemplated by the Services and these Legal Terms.
          </li>
          <li>Your Contributions are not false, inaccurate, or misleading.</li>
          <li>
            Your Contributions are not unsolicited or unauthorized advertising,
            promotional materials, pyramid schemes, chain letters, spam, mass
            mailings, or other forms of solicitation.
          </li>
          <li>
            Your Contributions are not obscene, lewd, lascivious, filthy,
            violent, harassing, libelous, slanderous, or otherwise objectionable
            (as determined by us).
          </li>
          <li>
            Your Contributions do not ridicule, mock, disparage, intimidate, or
            abuse anyone.
          </li>
          <li>
            Your Contributions do not advocate the violent overthrow of any
            government or incite, encourage, or threaten physical harm against
            another.
          </li>
          <li>
            Your Contributions do not violate any applicable law, regulation, or
            rule.
          </li>
          <li>
            Your Contributions do not violate the privacy or publicity rights of
            any third party.
          </li>
          <li>
            Your Contributions do not contain any material that solicits
            personal information from anyone under the age of 18 or exploits
            people under the age of 18 in a sexual or violent manner.
          </li>
          <li>
            Your Contributions do not violate any applicable law concerning
            child pornography, or otherwise intended to protect the health or
            well-being of minors.
          </li>
          <li>
            Your Contributions do not include any offensive comments that are
            connected to race, national origin, gender, sexual preference, or
            physical handicap.
          </li>
          <li>
            Your Contributions do not otherwise violate, or link to material
            that violates, any provision of these Legal Terms, or any applicable
            law or regulation.
          </li>
        </ul>

        <p>
          Any use of the Services in violation of the foregoing violates these
          Legal Terms and may result in, among other things, termination or
          suspension of your rights to use the Services.
        </p>

        <h1
          id="license"
          className={`terms-heading ${
            highlightedSection === "license" ? "highlight" : ""
          }`}
        >
          7. CONTRIBUTION LICENSE
        </h1>
        <p>
          By posting your Contributions to any part of the Services, you
          automatically grant, and you represent and warrant that you have the
          right to grant, to us an unrestricted, unlimited, irrevocable,
          perpetual, non-exclusive, transferable, royalty-free, fully-paid,
          worldwide right, and license to host, use, copy, reproduce, disclose,
          sell, resell, publish, broadcast, retitle, archive, store, cache,
          publicly perform, publicly display, reformat, translate, transmit,
          excerpt (in whole or in part), and distribute such Contributions
          (including, without limitation, your image and voice) for any purpose,
          commercial, advertising, or otherwise, and to prepare derivative works
          of, or incorporate into other works, such Contributions, and grant and
          authorize sublicenses of the foregoing. The use and distribution may
          occur in any media formats and through any media channels.
        </p>
        <p>
          This license will apply to any form, media, or technology now known or
          hereafter developed, and includes our use of your name, company name,
          and franchise name, as applicable, and any of the trademarks, service
          marks, trade names, logos, and personal and commercial images you
          provide. You waive all moral rights in your Contributions, and you
          warrant that moral rights have not otherwise been asserted in your
          Contributions.
        </p>
        <p>
          We do not assert any ownership over your Contributions. You retain
          full ownership of all of your Contributions and any intellectual
          property rights or other proprietary rights associated with your
          Contributions. We are not liable for any statements or representations
          in your Contributions provided by you in any area on the Services. You
          are solely responsible for your Contributions to the Services and you
          expressly agree to exonerate us from any and all responsibility and to
          refrain from any legal action against us regarding your Contributions.
        </p>
        <p>
          We have the right, in our sole and absolute discretion, (1) to edit,
          redact, or otherwise change any Contributions; (2) to re-categorize
          any Contributions to place them in more appropriate locations on the
          Services; and (3) to pre-screen or delete any Contributions at any
          time and for any reason, without notice. We have no obligation to
          monitor your Contributions.
        </p>

        <h1
          id="socialmedia"
          className={`terms-heading ${
            highlightedSection === "socialmedia" ? "highlight" : ""
          }`}
        >
          8. SOCIAL MEDIA
        </h1>
        <p>
          As part of the functionality of the Services, you may link your
          account with online accounts you have with third-party service
          providers (each such account, a "Third-Party Account") by either: (1)
          providing your Third-Party Account login information through the
          Services; or (2) allowing us to access your Third-Party Account, as is
          permitted under the applicable terms and conditions that govern your
          use of each Third-Party Account. You represent and warrant that you
          are entitled to disclose your Third-Party Account login information to
          us and/or grant us access to your Third-Party Account, without breach
          by you of any of the terms and conditions that govern your use of the
          applicable Third-Party Account, and without obligating us to pay any
          fees or making us subject to any usage limitations imposed by the
          third-party service provider of the Third-Party Account. By granting
          us access to any Third-Party Accounts, you understand that (1) we may
          access, make available, and store (if applicable) any content that you
          have provided to and stored in your Third-Party Account (the "Social
          Network Content") so that it is available on and through the Services
          via your account, including without limitation any friend lists and
          (2) we may submit to and receive from your Third-Party Account
          additional information to the extent you are notified when you link
          your account with the Third-Party Account. Depending on the
          Third-Party Accounts you choose and subject to the privacy settings
          that you have set in such Third-Party Accounts, personally
          identifiable information that you post to your Third-Party Accounts
          may be available on and through your account on the Services. Please
          note that if a Third-Party Account or associated service becomes
          unavailable or our access to such Third-Party Account is terminated by
          the third-party service provider, then Social Network Content may no
          longer be available on and through the Services. You will have the
          ability to disable the connection between your account on the Services
          and your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR
          RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH
          YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH
          SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any
          Social Network Content for any purpose, including but not limited to,
          for accuracy, legality, or non-infringement, and we are not
          responsible for any Social Network Content. You acknowledge and agree
          that we may access your email address book associated with a
          Third-Party Account and your contacts list stored on your mobile
          device or tablet computer solely for purposes of identifying and
          informing you of those contacts who have also registered to use the
          Services. You can deactivate the connection between the Services and
          your Third-Party Account by contacting us using the contact
          information below or through your account settings (if applicable). We
          will attempt to delete any information stored on our servers that was
          obtained through such Third-Party Account, except the username and
          profile picture that become associated with your account.
        </p>

        <h1
          id="advertisers"
          className={`terms-heading ${
            highlightedSection === "advertisers" ? "highlight" : ""
          }`}
        >
          9. ADVERTISERS
        </h1>
        <p>
          We allow advertisers to display their advertisements and other
          information in certain areas of the Services, such as sidebar
          advertisements or banner advertisements. If you are an advertiser, you
          shall take full responsibility for any advertisements you place on the
          Services and any services provided on the Services or products sold
          through those advertisements. Further, as an advertiser, you warrant
          and represent that you possess all rights and authority to place
          advertisements on the Services, including, but not limited to,
          intellectual property rights, publicity rights, and contractual
          rights.
        </p>
        <p>
          We simply provide the space to place such advertisements, and we have
          no other relationship with advertisers.
        </p>

        <h1
          id="sitemanage"
          className={`terms-heading ${
            highlightedSection === "sitemanage" ? "highlight" : ""
          }`}
        >
          10. SERVICES MANAGEMENT
        </h1>
        <p>
          We reserve the right, but not the obligation, to: (1) monitor the
          Services for violations of these Legal Terms; (2) take appropriate
          legal action against anyone who, in our sole discretion, violates the
          law or these Legal Terms, including without limitation, reporting such
          user to law enforcement authorities; (3) in our sole discretion and
          without limitation, refuse, restrict access to, limit the availability
          of, or disable (to the extent technologically feasible) any of your
          Contributions or any portion thereof; (4) in our sole discretion and
          without limitation, notice, or liability, to remove from the Services
          or otherwise disable all files and content that are excessive in size
          or are in any way burdensome to our systems; and (5) otherwise manage
          the Services in a manner designed to protect our rights and property
          and to facilitate the proper functioning of the Services.
        </p>

        <h1
          id="ppyes"
          className={`terms-heading ${
            highlightedSection === "ppyes" ? "highlight" : ""
          }`}
        >
          11. PRIVACY POLICY
        </h1>
        <p>
          We care about data privacy and security. Please review our Privacy
          Policy: [Privacy Policy URL]. By using the Services, you agree to be
          bound by our Privacy Policy, which is incorporated into these Legal
          Terms. Please be advised the Services are hosted in the United States.
          If you access the Services from any other region of the world with
          laws or other requirements governing personal data collection, use, or
          disclosure that differ from applicable laws in the United States, then
          through your continued use of the Services, you are transferring your
          data to the United States, and you agree to have your data transferred
          to and processed in the United States.
        </p>

        <h1 id="ppno" className="terms-heading">
          12. TERM AND TERMINATION
        </h1>
        <p>
          These Legal Terms shall remain in full force and effect while you use
          the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL
          TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
          NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING
          BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO
          REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
          WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY
          APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
          PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT
          OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR
          SOLE DISCRETION.
        </p>
        <p>
          If we terminate or suspend your account for any reason, you are
          prohibited from registering and creating a new account under your
          name, a fake or borrowed name, or the name of any third party, even if
          you may be acting on behalf of the third party. In addition to
          terminating or suspending your account, we reserve the right to take
          appropriate legal action, including without limitation pursuing civil,
          criminal, and injunctive redress.
        </p>

        <h1
          id="modifications"
          className={`terms-heading ${
            highlightedSection === "modifications" ? "highlight" : ""
          }`}
        >
          13. MODIFICATIONS AND INTERRUPTIONS
        </h1>
        <p>
          We reserve the right to change, modify, or remove the contents of the
          Services at any time or for any reason at our sole discretion without
          notice. However, we have no obligation to update any information on
          our Services. We also reserve the right to modify or discontinue all
          or part of the Services without notice at any time. We will not be
          liable to you or any third party for any modification, price change,
          suspension, or discontinuance of the Services.
        </p>
        <p>
          We cannot guarantee the Services will be available at all times. We
          may experience hardware, software, or other problems or need to
          perform maintenance related to the Services, resulting in
          interruptions, delays, or errors. We reserve the right to change,
          revise, update, suspend, discontinue, or otherwise modify the Services
          at any time or for any reason without notice to you. You agree that we
          have no liability whatsoever for any loss, damage, or inconvenience
          caused by your inability to access or use the Services during any
          downtime or discontinuance of the Services. Nothing in these Legal
          Terms will be construed to obligate us to maintain and support the
          Services or to supply any corrections, updates, or releases in
          connection therewith.
        </p>

        <h1
          id="law"
          className={`terms-heading ${
            highlightedSection === "law" ? "highlight" : ""
          }`}
        >
          14. GOVERNING LAW
        </h1>
        <p>
          These Legal Terms are governed by and interpreted following the laws
          of the State of Nevada, and the use of the United Nations Convention
          of Contracts for the International Sale of Goods is expressly
          excluded. If your habitual residence is in the EU, and you are a
          consumer, you additionally possess the protection provided to you by
          obligatory provisions of the law of your country of residence.
          Diplomat and yourself both agree to submit to the non-exclusive
          jurisdiction of the courts of [Nevada], which means that you may make
          a claim to defend your consumer protection rights in regards to these
          Legal Terms in [Nevada], or in the EU country in which you reside.
        </p>

        <h1
          id="disputes"
          className={`terms-heading ${
            highlightedSection === "disputes" ? "highlight" : ""
          }`}
        >
          15. DISPUTE RESOLUTION
        </h1>
        <h2 className="terms-subheading">Informal Negotiations</h2>
        <p>
          To expedite resolution and control the cost of any dispute,
          controversy, or claim related to these Legal Terms (each a "Dispute"
          and collectively, the "Disputes") brought by either you or us
          (individually, a "Party" and collectively, the "Parties"), the Parties
          agree to first attempt to negotiate any Dispute (except those Disputes
          expressly provided below) informally for at least thirty (30) days
          before initiating arbitration. Such informal negotiations commence
          upon written notice from one Party to the other Party.
        </p>
        <h2 className="terms-subheading">Binding Arbitration</h2>
        <p>
          If the Parties are unable to resolve a Dispute through informal
          negotiations, the Dispute (except those Disputes expressly excluded
          below) will be finally and exclusively resolved by binding
          arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD
          HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The arbitration
          shall be commenced and conducted under the Commercial Arbitration
          Rules of the American Arbitration Association ("AAA") and, where
          appropriate, the AAA’s Supplementary Procedures for Consumer Related
          Disputes ("AAA Consumer Rules"), both of which are available at the
          AAA website: www.adr.org. Your arbitration fees and your share of
          arbitrator compensation shall be governed by the AAA Consumer Rules
          and, where appropriate, limited by the AAA Consumer Rules. The
          arbitration may be conducted in person, through the submission of
          documents, by phone, or online. The arbitrator will make a decision in
          writing, but need not provide a statement of reasons unless requested
          by either Party. The arbitrator must follow applicable law, and any
          award may be challenged if the arbitrator fails to do so. Except where
          otherwise required by the applicable AAA rules or applicable law, the
          arbitration will take place in [County, Nevada]. Except as otherwise
          provided herein, the Parties may litigate in court to compel
          arbitration, stay proceedings pending arbitration, or to confirm,
          modify, vacate, or enter judgment on the award entered by the
          arbitrator.
        </p>
        <p>
          If for any reason, a Dispute proceeds in court rather than
          arbitration, the Dispute shall be commenced or prosecuted in the state
          and federal courts located in [County, Nevada], and the Parties hereby
          consent to, and waive all defenses of lack of personal jurisdiction,
          and forum non conveniens with respect to venue and jurisdiction in
          such state and federal courts. Application of the United Nations
          Convention on Contracts for the International Sale of Goods and the
          Uniform Computer Information Transaction Act (UCITA) is excluded from
          these Legal Terms.
        </p>
        <p>
          In no event shall any Dispute brought by either Party related in any
          way to the Services be commenced more than one (1) years after the
          cause of action arose. If this provision is found to be illegal or
          unenforceable, then neither Party will elect to arbitrate any Dispute
          falling within that portion of this provision found to be illegal or
          unenforceable and such Dispute shall be decided by a court of
          competent jurisdiction within the courts listed for jurisdiction
          above, and the Parties agree to submit to the personal jurisdiction of
          that court.
        </p>
        <h2 className="terms-subheading">Restrictions</h2>
        <p>
          The Parties agree that any arbitration shall be limited to the Dispute
          between the Parties individually. To the full extent permitted by law,
          (a) no arbitration shall be joined with any other proceeding; (b)
          there is no right or authority for any Dispute to be arbitrated on a
          class-action basis or to utilize class action procedures; and (c)
          there is no right or authority for any Dispute to be brought in a
          purported representative capacity on behalf of the general public or
          any other persons.
        </p>
        <h2 className="terms-subheading">
          Exceptions to Informal Negotiations and Arbitration
        </h2>
        <p>
          The Parties agree that the following Disputes are not subject to the
          above provisions concerning informal negotiations and binding
          arbitration: (a) any Disputes seeking to enforce or protect, or
          concerning the validity of, any of the intellectual property rights of
          a Party; (b) any Dispute related to, or arising from, allegations of
          theft, piracy, invasion of privacy, or unauthorized use; and (c) any
          claim for injunctive relief. If this provision is found to be illegal
          or unenforceable, then neither Party will elect to arbitrate any
          Dispute falling within that portion of this provision found to be
          illegal or unenforceable and such Dispute shall be decided by a court
          of competent jurisdiction within the courts listed for jurisdiction
          above, and the Parties agree to submit to the personal jurisdiction of
          that court.
        </p>

        <h1
          id="corrections"
          className={`terms-heading ${
            highlightedSection === "corrections" ? "highlight" : ""
          }`}
        >
          16. CORRECTIONS
        </h1>
        <p>
          There may be information on the Services that contains typographical
          errors, inaccuracies, or omissions, including descriptions, pricing,
          availability, and various other information. We reserve the right to
          correct any errors, inaccuracies, or omissions and to change or update
          the information on the Services at any time, without prior notice.
        </p>

        <h1
          id="disclaimer"
          className={`terms-heading ${
            highlightedSection === "disclaimer" ? "highlight" : ""
          }`}
        >
          17. DISCLAIMER
        </h1>
        <p>
          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
          AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE
          FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS
          OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF,
          INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
          ACCURACY OR COMPLETENESS OF THE SERVICES’ CONTENT OR THE CONTENT OF
          ANY WEBSITES LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR
          RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF
          CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY
          NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
          SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
          AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
          STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO
          OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE
          LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD
          PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS
          OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE
          OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA
          THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
          RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A
          THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY
          WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
          ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
          RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
          THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF
          A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU
          SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
        </p>

        <h1
          id="liability"
          className={`terms-heading ${
            highlightedSection === "liability" ? "highlight" : ""
          }`}
        >
          18. LIMITATIONS OF LIABILITY
        </h1>
        <p>
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
          TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
          EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
          PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR
          USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY
          OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED
          HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS
          OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER
          OF THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH
          PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR $100.00 USD. CERTAIN US
          STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED
          WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE
          LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS
          MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
        </p>

        <h1
          id="indemnification"
          className={`terms-heading ${
            highlightedSection === "indemnification" ? "highlight" : ""
          }`}
        >
          19. INDEMNIFICATION
        </h1>
        <p>
          You agree to defend, indemnify, and hold us harmless, including our
          subsidiaries, affiliates, and all of our respective officers, agents,
          partners, and employees, from and against any loss, damage, liability,
          claim, or demand, including reasonable attorneys’ fees and expenses,
          made by any third party due to or arising out of: (1) use of the
          Services; (2) breach of these Legal Terms; (3) any breach of your
          representations and warranties set forth in these Legal Terms; (4)
          your violation of the rights of a third party, including but not
          limited to intellectual property rights; or (5) any overt harmful act
          toward any other user of the Services with whom you connected via the
          Services. Notwithstanding the foregoing, we reserve the right, at your
          expense, to assume the exclusive defense and control of any matter for
          which you are required to indemnify us, and you agree to cooperate, at
          your expense, with our defense of such claims. We will use reasonable
          efforts to notify you of any such claim, action, or proceeding which
          is subject to this indemnification upon becoming aware of it.
        </p>

        <h1
          id="userdata"
          className={`terms-heading ${
            highlightedSection === "userdata" ? "highlight" : ""
          }`}
        >
          20. USER DATA
        </h1>
        <p>
          We will maintain certain data that you transmit to the Services for
          the purpose of managing the performance of the Services, as well as
          data relating to your use of the Services. Although we perform regular
          routine backups of data, you are solely responsible for all data that
          you transmit or that relates to any activity you have undertaken using
          the Services. You agree that we shall have no liability to you for any
          loss or corruption of any such data, and you hereby waive any right of
          action against us arising from any such loss or corruption of such
          data.
        </p>

        <h1
          id="electronic"
          className={`terms-heading ${
            highlightedSection === "electronic" ? "highlight" : ""
          }`}
        >
          21. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
        </h1>
        <p>
          Visiting the Services, sending us emails, and completing online forms
          constitute electronic communications. You consent to receive
          electronic communications, and you agree that all agreements, notices,
          disclosures, and other communications we provide to you
          electronically, via email and on the Services, satisfy any legal
          requirement that such communication be in writing. YOU HEREBY AGREE TO
          THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER
          RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS
          OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You
          hereby waive any rights or requirements under any statutes,
          regulations, rules, ordinances, or other laws in any jurisdiction
          which require an original signature or delivery or retention of
          non-electronic records, or to payments or the granting of credits by
          any means other than electronic means.
        </p>

        <h1
          id="california"
          className={`terms-heading ${
            highlightedSection === "california" ? "highlight" : ""
          }`}
        >
          22. CALIFORNIA USERS AND RESIDENTS
        </h1>
        <p>
          If any complaint with us is not satisfactorily resolved, you can
          contact the Complaint Assistance Unit of the Division of Consumer
          Services of the California Department of Consumer Affairs in writing
          at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834
          or by telephone at (800) 952-5210 or (916) 445-1254.
        </p>

        <h1
          id="misc"
          className={`terms-heading ${
            highlightedSection === "misc" ? "highlight" : ""
          }`}
        >
          23. MISCELLANEOUS
        </h1>
        <p>
          These Legal Terms and any policies or operating rules posted by us on
          the Services or in respect to the Services constitute the entire
          agreement and understanding between you and us. Our failure to
          exercise or enforce any right or provision of these Legal Terms shall
          not operate as a waiver of such right or provision. These Legal Terms
          operate to the fullest extent permissible by law. We may assign any or
          all of our rights and obligations to others at any time. We shall not
          be responsible or liable for any loss, damage, delay, or failure to
          act caused by any cause beyond our reasonable control. If any
          provision or part of a provision of these Legal Terms is determined to
          be unlawful, void, or unenforceable, that provision or part of the
          provision is deemed severable from these Legal Terms and does not
          affect the validity and enforceability of any remaining provisions.
          There is no joint venture, partnership, employment or agency
          relationship created between you and us as a result of these Legal
          Terms or use of the Services. You agree that these Legal Terms will
          not be construed against us by virtue of having drafted them. You
          hereby waive any and all defenses you may have based on the electronic
          form of these Legal Terms and the lack of signing by the parties
          hereto to execute these Legal Terms.
        </p>

        <h1
          id="contact"
          className={`terms-heading ${
            highlightedSection === "contact" ? "highlight" : ""
          }`}
        >
          24. CONTACT US
        </h1>
        <p>
          In order to resolve a complaint regarding the Services or to receive
          further information regarding the use of the Services, please contact
          us at: Diplomat, 1411 Robin St, Las Vegas, NV 89106, United States.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
