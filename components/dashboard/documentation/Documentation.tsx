"use client";

import { Button, Paper } from "@mui/material";
import s from "./styles.module.css";
import { useRouter } from "next/navigation";

const Documentation = () => {
  const router = useRouter();
  return (
    <div className={`${s.documentationContainer} wrapper`}>
      <h2>Support and Documentation</h2>
      <Button
        onClick={() => router.push("/")}
        className={s.documentationButton}
      >
        Go to Landing Page
      </Button>
      <div className={s.supportSection}>
        <h3>Frequently asked questions</h3>
        <Paper elevation={3} className={s.faqContainer}>
          <ul>
            <li>
              <h3>Q: How do I create a new case?</h3>
              <p>
                To create a new case, click the <strong>CASES</strong> tab
                followed by the <strong>Add</strong> option. You must provide a
                case description, select the type of crime associated with the
                case, and upload a report either from a file or write one in the
                provided section. For best practices on how a case should be
                created, view <strong>case documentation</strong>.
              </p>
            </li>
            <li>
              <h3>Q: How do I view a specific case?</h3>
              <p>
                To view a specific case, click the <strong>CASES</strong> tab
                followed by the <strong>View</strong> option. If you know the
                case ID, or case number, enter one in the appropriate filter
                field and press <strong>SEARCH</strong>. You can leave all
                fields empty and press <strong>SEARCH</strong> if you want to
                look for the case from a list of all records.
              </p>
            </li>
            <li>
              <h3>Q: How do I upload evidence?</h3>
              <p>
                To upload evidence, click the <strong>EVIDENCE</strong> tab
                followed by the <strong>Add</strong> option. You must select a
                case ID which you can select from a list of all available case
                IDs, or you can copy and paste the ID manually. Ensure you
                select a status, type, photo, and description for the evidence.
                For best practices on how a evidence should be created, view{" "}
                <strong>evidence documentation</strong>.
              </p>
            </li>
            <li>
              <h3>Q: How do I view evidence?</h3>
              <p>
                Similar to viewing a case, click the <strong>EVIDENCE</strong>{" "}
                tab followed by the <strong>View</strong> option. Using the
                evidence filters you can narrow down your search, or you can
                leave all fields empty and press <strong>SEARCH</strong> to
                retrieve all evidence records.
              </p>
            </li>
          </ul>
        </Paper>
        <h3 className={s.otherQuestions}>For all other questions:</h3>
        <div className={s.contactContainer}>
          <div className={s.generalInquiries}>
            <h4>General Inquiries</h4>
            <p>Phone: 111 222 3333</p>
            <p>Extension: 123</p>
            <p>Email: general@hrps.com</p>
          </div>
          <div className={s.technicalSupport}>
            <h4>Technical Support</h4>
            <p>Phone: 111 222 4444</p>
            <p>Extension: 133</p>
            <p>Email: technical@hrps.com</p>
          </div>
          <div className={s.caseLead}>
            <h4>Case Information</h4>
            <p>Phone: 111 222 5555</p>
            <p>Extension: 144</p>
            <p>Email: case@hrps.com</p>
          </div>
        </div>
      </div>
      <div id="documentation" className={s.documentationSection}>
        <h2>Documentation</h2>
        <div className={s.caseDocs}>
          <h4>Case Guidelines</h4>
          <ol>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
          </ol>
        </div>
        <div className={s.evidenceDocs}>
          <h4>Evidence Guidelines</h4>
          <ol>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
          </ol>
        </div>
        <div className={s.storageDocs}>
          <h4>Storage Guidelines</h4>
          <ol>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
          </ol>
        </div>
        <div className={s.trackingDocs}>
          <h4>Tracking Guidelines</h4>
          <ol>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              adipisci modi corporis iure voluptatum iste error? Odio facilis
              praesentium quidem iste alias consectetur, quod veniam sint
              exercitationem quasi nostrum eligendi! Voluptatibus eveniet,
              veritatis tempora doloremque perspiciatis magnam consequatur
              pariatur! Cumque?
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
export default Documentation;
