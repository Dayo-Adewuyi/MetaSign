import React, { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { signatureUrl, ipfsUrl, getExplorerUrl } from "../util";
import { EXAMPLE_FORM } from "../util/constants";
import { FileDrop } from "./FileDrop/FileDrop";
import { storeFiles } from "../util/stor";
import { deployContract, validAddress } from "../contract/towoboContract";
import {EmailShareButton} from "react-share";
import {SlEnvolope} from "react-icons/sl";

const { Step } = Steps;

function CreateSignature(props) {
  const [data, setData] = useState({ ...EXAMPLE_FORM });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const isValid = (data) => {
    return (
      data.title &&
      data.description &&
      data.files.length > 0 &&
      validAddress(data.signerAddress)
    );
  };
  const isValidData = isValid(data);

  const create = async () => {
    setError(undefined);

    if (!isValidData) {
      setError(
        "Please provide a title, description, valid address, and at least one file."
      );
      return;
    }

    setLoading(true);
    const body = { ...data };

    // Format files for upload.
    const files = body.files.map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // 1) deploy base contract with metadata,
      const contract = await deployContract(data.title, data.signerAddress);
      // res["contract"] = contract;
      res["address"] = contract.address
      res["files"] = files.map(f => f.path)

      const blob = new Blob([JSON.stringify(res)], { type: 'application/json' })
      const metadataFile = new File([blob], 'metadata.json')
      const allFiles = [...files, metadataFile]

      // 2) Upload files to ipfs,
      const cid = await storeFiles(allFiles);
      res['cid'] = cid

      // 3) return shareable url.
      res["signatureUrl"] = signatureUrl(cid);
      res["contractUrl"] = getExplorerUrl(res.address);

      // Result rendered after successful doc upload + contract creation.
      setResult(res);
      try {
        // await postPacket(res.esignature request);
      } catch (e) {
        console.error("error posting signature request", e);
      }
    } catch (e) {
      console.error("error creating signature request", e);
      setError(e.message || e.toString())
    } finally {
      setLoading(false);
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (isValidData) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <h2>Create a signature request</h2>
            <br />

            <h3 className="vertical-margin">signature request title:</h3>
            <Input
              placeholder="Title of the esignature request"
              value={data.title}
              prefix="Title:"
              onChange={(e) => updateData("title", e.target.value)}
            />
            <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the esignature request"
              prefix="Description"
              value={data.description}
            />

            
            <h3 className="vertical-margin">Upload document(s):</h3>
            <FileDrop
              files={data.files}
              setFiles={(files) => updateData("files", files)}
            />

            <h3 className="vertical-margin">Enter signer address:</h3>
            <p>
              In order to sign the documents, the potential signer of the document(s) must prove ownership of a
              particular address
            </p>
            <Input
              placeholder="Wallet address of signer"
              value={data.signerAddress}
              prefix="Signer Address:"
              onChange={(e) => updateData("signerAddress", e.target.value)}
            />
            <br />

            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading} // || !isValidData}
              loading={loading}
            >
              Create signature request!
            </Button>
            {!error && !result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {error && <div className="error-text">{error}</div>}
            {result && (
              <div>
                <div className="success-text">Created a signature request!</div>
                <a href={ipfsUrl(result.cid)} target="_blank">
                  View metadata
                </a>
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <br />
                <p>
                  Share this url with the signer:
                  <br />
                  <a href={result.signatureUrl} target="_blank">
                    Open eSignature url
                   
                  </a>
                  <EmailShareButton subject="E-signature Request from Towobo" body={`kindly open the link ${result.signatureUrl} and append signature`}/>
                  
                </p>
                 <div className="success-text" onClick={(e) => {
                 
                  window.location.href = result.signatureUrl;
                  e.preventDefault();
                 }}><SlEnvolope/> </div>
               
              </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title="Create signature request"
                description="Requires authorizing a create signature request operation."
              />
              <Step
                title="Wait for signature"
                description="Your signature request will be live for others to view and submit signature."
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateSignature.propTypes = {};

export default CreateSignature;
