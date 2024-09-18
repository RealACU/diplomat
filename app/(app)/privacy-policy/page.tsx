import "./privacypolicy.css";

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">PRIVACY POLICY</h1>
      <p className="privacy-updated">
        <strong>Last updated October 10, 2023</strong>
      </p>
      <p className="privacy-intro">
        This Privacy Notice for Diplomat ("<strong>we</strong>", "
        <strong>us</strong>", or "<strong>our</strong>"), describes how and why we
        might access, collect, store, use, and/or share ("<strong>process</strong>")
        your personal information when you use our services ("<strong>Services</strong>"),
        including when you:
      </p>
      <ul className="privacy-list">
        <li>Visit our website</li>
        <li>
          Use <strong>Signing up for tournaments</strong> to sign up for popular
          Model UN tournaments across the US.
        </li>
        <li>
          Engage with us in other related ways, including any sales, marketing,
          or events
        </li>
      </ul>
      <p className="privacy-questions">
        <strong>Questions or concerns? </strong>Reading this Privacy Notice will
        help you understand your privacy rights and choices. If you have any
        questions, please{" "}
        <a href="/contact-us" className="privacy-link">
          contact us
        </a>
        .
      </p>

      <h2 className="privacy-subheading">SUMMARY OF KEY POINTS</h2>
      <p className="privacy-summary">
        <strong>
          <em>
            This summary provides key points from our Privacy Notice. You can
            find more details by using our{" "}
            <a href="#toc" className="privacy-link">
              table of contents
            </a>
            .
          </em>
        </strong>
      </p>
      <p className="privacy-content">
        <strong>What personal information do we process?</strong> When you visit,
        use, or navigate our Services, we may process personal information
        depending on how you interact with Diplomat and the Services, the choices
        you make, and the products and features you use. Learn more about{" "}
        <a href="#infocollect" className="privacy-link">
          what information do we collect
        </a>
        .
      </p>
      <p className="privacy-content">
        <strong>Do we process any sensitive personal information?</strong> We do
        not process sensitive personal information.
      </p>
      <p className="privacy-content">
        <strong>Do we collect any information from third parties?</strong> We do
        not collect any information from third parties.
      </p>
      <p className="privacy-content">
        <strong>How do we process your information?</strong> We process your
        information to provide, improve, and administer our Services, communicate
        with you, for security and fraud prevention, and to comply with law. We
        may also process your information for other purposes with your consent.
        Learn more about{" "}
        <a href="#infouse" className="privacy-link">
          how we process your information
        </a>
        .
      </p>
      <p className="privacy-content">
        <strong>
          In what situations and with which parties do we share personal
          information?
        </strong>{" "}
        We may share information in specific situations and with specific third
        parties. Learn more about{" "}
        <a href="#whoshare" className="privacy-link">
          when and with whom we share your personal information
        </a>
        .
      </p>
      <p className="privacy-content">
        <strong>How do we keep your information safe?</strong> We have adequate
        organizational and technical processes and procedures in place to protect
        your personal information. However, no electronic transmission over the
        internet or information storage technology can be guaranteed to be 100%
        secure. Learn more about{" "}
        <a href="#infosafe" className="privacy-link">
          how we keep your information safe
        </a>
        .
      </p>
      <p className="privacy-content">
        <strong>What are your rights?</strong> Depending on where you are located
        geographically, the applicable privacy law may mean you have certain
        rights regarding your personal information. Learn more about{" "}
        <a href="#privacyrights" className="privacy-link">
          your privacy rights
        </a>
        .
      </p>
      <p className="privacy-content">
        <strong>How do you exercise your rights?</strong> The easiest way to
        exercise your rights is by visiting{" "}
        <a href="/" className="privacy-link">
          Diplomat
        </a>
        , or by contacting us. We will consider and act upon any request in
        accordance with applicable data protection laws.
      </p>
      <p className="privacy-content">
        Want to learn more about what we do with any information we collect?{" "}
        <a href="#toc" className="privacy-link">
          Review the Privacy Notice in full
        </a>
        .
      </p>

      {/* Section 1 */}
      <h2 className="privacy-section-heading" id="infocollect">
        1. WHAT INFORMATION DO WE COLLECT?
      </h2>
      <h3 className="privacy-section-subheading" id="personalinfo">
        Personal information you disclose to us
      </h3>
      <p className="privacy-content">
        <strong>In Short:</strong> We collect personal information that you
        provide to us.
      </p>
      <p className="privacy-content">
        We collect personal information that you voluntarily provide to us when
        you register on the Services, express an interest in obtaining
        information about us or our products and Services, when you participate
        in activities on the Services, or otherwise when you contact us.
      </p>
      <p className="privacy-content">
        <strong>Personal Information Provided by You.</strong> The personal
        information that we collect depends on the context of your interactions
        with us and the Services, the choices you make, and the products and
        features you use. The personal information we collect may include the
        following:
      </p>
      <ul className="privacy-list">
        <li>names</li>
        <li>email addresses</li>
        <li>usernames</li>
        <li>passwords</li>
      </ul>
      <p className="privacy-content">
        <strong>Sensitive Information.</strong> We do not process sensitive
        information.
      </p>
      <p className="privacy-content">
        <strong>Social Media Login Data.</strong> We may provide you with the
        option to register with us using your existing social media account
        details, like your Facebook, X, or other social media account. If you
        choose to register in this way, we will collect certain profile
        information about you from the social media provider, as described in
        the section called{" "}
        <a href="#sociallogins" className="privacy-link">
          HOW DO WE HANDLE YOUR SOCIAL LOGINS?
        </a>{" "}
        below.
      </p>
      <p className="privacy-content">
        All personal information that you provide to us must be true, complete,
        and accurate, and you must notify us of any changes to such personal
        information.
      </p>

      {/* Section 2 */}
      <h2 className="privacy-section-heading" id="infouse">
        2. HOW DO WE PROCESS YOUR INFORMATION?
      </h2>
      <p className="privacy-content">
        <strong>In Short:</strong> We process your information to provide,
        improve, and administer our Services, communicate with you, for security
        and fraud prevention, and to comply with law. We may also process your
        information for other purposes with your consent.
      </p>
      <p className="privacy-content">
        We process your personal information for a variety of reasons, depending
        on how you interact with our Services, including:
      </p>
      <ul className="privacy-list">
        <li>
          <strong>
            To facilitate account creation and authentication and otherwise
            manage user accounts.
          </strong>{" "}
          We may process your information so you can create and log in to your
          account, as well as keep your account in working order.
        </li>
        <li>
          <strong>To respond to user inquiries/offer support to users.</strong>{" "}
          We may process your information to respond to your inquiries and solve
          any potential issues you might have with the requested service.
        </li>
      </ul>

      {/* Section 3 */}
      <h2 className="privacy-section-heading" id="whoshare">
        3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
      </h2>
      <p className="privacy-content">
        <strong>In Short:</strong> We may share information in specific
        situations described in this section and/or with the following third
        parties.
      </p>
      <p className="privacy-content">
        We may need to share your personal information in the following
        situations:
      </p>
      <ul className="privacy-list">
        <li>
          <strong>Business Transfers.</strong> We may share or transfer your
          information in connection with, or during negotiations of, any merger,
          sale of company assets, financing, or acquisition of all or a portion
          of our business to another company.
        </li>
      </ul>

      {/* Section 4 */}
      <h2 className="privacy-section-heading" id="sociallogins">
        4. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
      </h2>
      <p className="privacy-content">
        <strong>In Short:</strong> If you choose to register or log in to our
        Services using a social media account, we may have access to certain
        information about you.
      </p>
      <p className="privacy-content">
        Our Services offer you the ability to register and log in using your
        third-party social media account details (like your Facebook or X
        logins). Where you choose to do this, we will receive certain profile
        information about you from your social media provider. The profile
        information we receive may vary depending on the social media provider
        concerned, but will often include your name, email address, friends
        list, and profile picture, as well as other information you choose to
        make public on such a social media platform.
      </p>
      <p className="privacy-content">
        We will use the information we receive only for the purposes that are
        described in this Privacy Notice or that are otherwise made clear to you
        on the relevant Services. Please note that we do not control, and are
        not responsible for, other uses of your personal information by your
        third-party social media provider. We recommend that you review their
        privacy notice to understand how they collect, use, and share your
        personal information, and how you can set your privacy preferences on
        their sites and apps.
      </p>

      {/* Section 5 */}
      <h2 className="privacy-section-heading" id="inforetain">
        5. HOW LONG DO WE KEEP YOUR INFORMATION?
      </h2>
      <p className="privacy-content">
        <strong>In Short:</strong> We keep your information for as long as
        necessary to fulfill the purposes outlined in this Privacy Notice unless
        otherwise required by law.
      </p>
      <p className="privacy-content">
        We will only keep your personal information for as long as it is
        necessary for the purposes set out in this Privacy Notice, unless a
        longer retention period is required or permitted by law (such as tax,
        accounting, or other legal requirements). No purpose in this notice will
        require us keeping your personal information for longer than the period
        of time in which users have an account with us.
      </p>
      <p className="privacy-content">
        When we have no ongoing legitimate business need to process your
        personal information, we will either delete or anonymize such
        information, or, if this is not possible (for example, because your
        personal information has been stored in backup archives), then we will
        securely store your personal information and isolate it from any further
        processing until deletion is possible.
      </p>

      {/* Section 6 */}
      <h2 className="privacy-section-heading" id="infosafe">
        6. HOW DO WE KEEP YOUR INFORMATION SAFE?
      </h2>
      <p className="privacy-content">
        <strong>In Short:</strong> We aim to protect your personal information
        through a system of organizational and technical security measures.
      </p>
      <p className="privacy-content">
        We have implemented appropriate and reasonable technical and
        organizational security measures designed to protect the security of any
        personal information we process. However, despite our safeguards and
        efforts to secure your information, no electronic transmission over the
        Internet or information storage technology can be guaranteed to be 100%
        secure, so we cannot promise or guarantee that hackers, cybercriminals,
        or other unauthorized third parties will not be able to defeat our
        security and improperly collect, access, steal, or modify your
        information. Transmission of personal information to and from our
        Services is at your own risk. You should only access the Services within
        a secure environment.
      </p>

      {/* Section 7 */}
      <h2 className="privacy-section-heading" id="privacyrights">
        7. WHAT ARE YOUR PRIVACY RIGHTS?
      </h2>
      <p className="privacy-content">
        <strong>In Short:</strong> Depending on your country, province, or state
        of residence, you may have certain rights regarding your personal
        information.
      </p>
      <p className="privacy-content">
        You may review, change, or terminate your account at any time.
      </p>
      <p className="privacy-content">
        If you have questions or comments about your privacy rights, you may
        email us at{" "}
        <a href="/contact-us" className="privacy-link">
          Contact Us Form
        </a>
        .
      </p>

      {/* Section 8 */}
      <h2 className="privacy-section-heading" id="DNT">
        8. CONTROLS FOR DO-NOT-TRACK FEATURES
      </h2>
      <p className="privacy-content">
        Most web browsers and some mobile operating systems and mobile
        applications include a Do-Not-Track ("DNT") feature or setting you can
        activate to signal your privacy preference not to have data about your
        online browsing activities monitored and collected. At this stage, no
        uniform technology standard for recognizing and implementing DNT signals
        has been finalized. As such, we do not currently respond to DNT browser
        signals or any other mechanism that automatically communicates your
        choice not to be tracked online.
      </p>

      {/* Section 9 */}
      <h2 className="privacy-section-heading" id="uslaws">
        9. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
      </h2>
      <p className="privacy-content">
        <strong>In Short:</strong> If you are a resident of California, Colorado,
        Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Montana, New
        Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, or Virginia, you
        may have rights to access, correct, or delete personal information.
        Please refer to specific laws in your state for more details.
      </p>
      <p className="privacy-content">
        We have not disclosed, sold, or shared any personal information to third
        parties for a business or commercial purpose in the preceding twelve
        (12) months. We will not sell or share personal information in the
        future belonging to website visitors, users, and other consumers.
      </p>

      {/* Section 10 */}
      <h2 className="privacy-section-heading" id="policyupdates">
        10. DO WE MAKE UPDATES TO THIS NOTICE?
      </h2>
      <p className="privacy-content">
        <strong>In Short:</strong> Yes, we will update this notice as necessary
        to stay compliant with relevant laws.
      </p>
      <p className="privacy-content">
        We may update this Privacy Notice from time to time. The updated version
        will be indicated by an updated "Revised" date at the top of this
        Privacy Notice. If we make material changes to this Privacy Notice, we
        may notify you either by prominently posting a notice of such changes or
        by directly sending you a notification. We encourage you to review this
        Privacy Notice frequently to be informed of how we are protecting your
        information.
      </p>

      {/* Section 11 */}
      <h2 className="privacy-section-heading" id="contact">
        11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
      </h2>
      <p className="privacy-content">
        If you have questions or comments about this notice, you may email us at{" "}
        <a href="/contact-us" className="privacy-link">
          Contact Form
        </a>{" "}
        or contact us by post at:
      </p>
      <p className="privacy-content">
        Diplomat
        <br />
        __________
        <br />
        __________
        <br />
        United States
      </p>

      {/* Section 12 */}
      <h2 className="privacy-section-heading" id="request">
        12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
      </h2>
      <p className="privacy-content">
        Based on the applicable laws of your country or state of residence, you
        may have the right to request access to the personal information we
        collect from you, details about how we have processed it, correct
        inaccuracies, or delete your personal information. To request to review,
        update, or delete your personal information, please visit:{" "}
        <a href="/" className="privacy-link">
          Diplomat
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
