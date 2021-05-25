/*
Copyright (c) 2018-2021 Qualcomm Technologies, Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted (subject to the limitations in the 
disclaimer below) provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer 
      in the documentation and/or other materials provided with the distribution.
    * Neither the name of Qualcomm Technologies, Inc. nor the names of its contributors may be used to endorse or promote 
      products derived from this software without specific prior written permission.
    * The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use 
      this software in a product, an acknowledgment is required by displaying the trademark/log as per the details provided 
      here: https://www.qualcomm.com/documents/dirbs-logo-and-brand-guidelines
    * Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
    * This notice may not be removed or altered from any source distribution.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY THIS LICENSE. THIS SOFTWARE IS PROVIDED 
BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from "react";

import { Row, Col, Label, CardBody, Button } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Field, FieldArray } from "formik";
import renderInput from "../../../components/Form/RenderInput";
import RenderCheckbox from "../../../components/Form/RenderCheckbox";
import RenderSelect from "././../../../components/Form/RenderSelect";
import TooltipMessage from "././../../../components/Form/TooltipMessage";
export function errorClass(errors, touched, i) {
  return errors &&
    errors.region_operator &&
    errors.region_operator[i] &&
    errors.region_operator[i]["id"] &&
    touched &&
    touched.region_operator &&
    touched.region_operator[i] &&
    touched.region_operator[i]["id"]
    ? "is-invalid"
    : "";
}
const Step6 = (props) => {
  return (
    <CardBody>
      <h5>Operational : </h5>
      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10">
            <Field
              requiredStar
              name="activate_whitelist"
              component={RenderCheckbox}
              type="checkbox"
              label="Activate Whitelist"
            />
            <TooltipMessage
              id="activate_whitelist"
              type="checkboxTooltip"
              showInfo="Boolean variable used to activate whitelist mode, default False
               By setting it true will result in activation of extra migrations and functions related to
               DIRBS Core Whitelisting mode."
            />
          </div>
        </Col>

        <Col md={6}>
          <div className="col-sm-10">
            <Field
              requiredStar
              name="restrict_whitelist"
              component={RenderCheckbox}
              type="checkbox"
              label="Restrict Whitelist"
            />
            <TooltipMessage
              id="restrict_whitelist"
              type="checkboxTooltip"
              showInfo="The boolean variable to toggle the settings weather to share the whitelist with the operators or not."
            />
          </div>
        </Col>
      </Row>
      {props.values.activate_whitelist === true && (
        <>
          <hr />
          <h5>Broker : </h5>
          <Row lg={2} sm={1}>
            <h5 className="ml-4">kafka : </h5>
            <Col md={6}>
              <div className="col-sm-10">
                <Field
                  requiredStar
                  name="kafka_hostname"
                  component={renderInput}
                  type="text"
                  label="Hostname"
                  placeholder="Hostname"
                />
                <TooltipMessage
                  id="kafka_hostname"
                  type="inputTooltip"
                  showInfo="The host name for the KAFKA server, overridden by environment variable
                        DIRBS_KAFKA_HOST if set."
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="col-sm-10">
                <Field
                  requiredStar
                  name="kafka_port"
                  component={renderInput}
                  type="text"
                  label="Port"
                  placeholder="Port"
                />
                <TooltipMessage
                  id="kafka_port"
                  type="inputTooltip"
                  showInfo="The available port for the KAFKA server, overridden by environment variable
                       DIRBS_KAFKA_PORT."
                />
              </div>
            </Col>
          </Row>
          <Row lg={2} sm={1}>
            <Col md={6}>
              <div className="col-sm-10">
                <Field
                  requiredStar
                  name="kafka_topic"
                  component={renderInput}
                  type="text"
                  label="Topic"
                  placeholder="Topic"
                />
                <TooltipMessage
                  id="kafka_topic"
                  type="inputTooltip"
                  showInfo="The topic DIRBS will use to receive notifications and requests from operators, overridden
                       by environment variable DIRBS_KAFKA_TOPIC if set."
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="col-sm-10">
                <RenderSelect
                  value={props.values.security_protocol}
                  onChange={props.setFieldValue}
                  options={[
                    {
                      label: "PLAINTEXT",
                      value: "PLAINTEXT",
                    },
                    {
                      label: "SSL",
                      value: "ssl",
                    },
                  ]}
                  onBlur={props.setFieldTouched}
                  error={props.errors.security_protocol}
                  touched={props.touched.security_protocol}
                  fieldName={`security_protocol`}
                  label={"Select Security Protocol"}
                  placeholder={"Select Security Protocol"}
                  stayOpen={true}
                />
                <TooltipMessage
                  id="security_protocol"
                  type="inputTooltip"
                  showInfo="The configs below are used for SSL based KAFKA deployment, if enabled the system will use them to established
             connection to KAFKA using SSL.
             To set a security protocol mode, two available options right now, plain and ssl. If ssl is enabled the value beneath
             should be set accordingly. Default is set to plain, which means no ssl."
                />
              </div>
            </Col>
          </Row>
          {props.values.security_protocol.value === "ssl" && (
            <>
              <Row>
                <Col md={6}>
                  <div className="col-sm-10">
                    <Field
                      requiredStar
                      name="client_certificate"
                      component={renderInput}
                      type="text"
                      label="Client Certificate"
                      placeholder="Client Certificate"
                    />
                    <TooltipMessage
                      id="client_certificate"
                      type="inputTooltip"
                      showInfo="The path to the client certificate signed by the CA, which will be used for the SSL connection. This should be in
                  .pem format. e.g client-cert.pemBy setting it true will result in activation of extra migrations and functions related to
                      DIRBS Core Whitelisting mode."
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="col-sm-10">
                    <Field
                      requiredStar
                      name="caroot_certificate"
                      component={renderInput}
                      type="text"
                      label="Caroot Certificate"
                      placeholder="Caroot Certificate"
                    />
                    <TooltipMessage
                      id="caroot_certificate"
                      type="inputTooltip"
                      showInfo="The path to the CARoot certificate. The valid format should be a .pem file."
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div className="col-sm-10 ">
                    <Field
                      requiredStar
                      name="client_key"
                      component={renderInput}
                      type="text"
                      label="Client Key"
                      placeholder="Client Key"
                    />
                    <TooltipMessage
                      id="client_key"
                      type="inputTooltip"
                      showInfo="The path to the client key, it should be in .pem format."
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="col-sm-10 mt-4">
                    <Field
                      requiredStar
                      name="skip_tls_verifications"
                      component={RenderCheckbox}
                      type="checkbox"
                      label="Skip tls Verifications"
                      placeholder="Skip tls Verifications"
                    />
                    <TooltipMessage
                      id="skip_tls_verifications"
                      type="checkboxTooltip"
                      showInfo="To weather skip tls verification or not. The default value is False. This should only be used in a dev env where
                            one needs to use a self-signed certificates."
                    />
                  </div>
                </Col>
              </Row>
            </>
          )}
          <hr />
          <h5 className="ml-4">Operators :</h5>

          <Row lg={12} sm={1}>
            <Col md={{ size: 10, offset: 1 }}>
              <div className="add-remove-wrap position-relative">
                <FieldArray
                  name="broker_operator"
                  render={({ insert, remove, push }) => {
                    return (
                      <div>
                        {props.values.broker_operator &&
                          props.values.broker_operator.length >= 0 &&
                          props.values.broker_operator.map(
                            (broker_operator, i) => {
                              let inputClass = errorClass(
                                props.errors,
                                props.touched,
                                i
                              );

                              return (
                                <Row key={i} className="mt-3 ">
                                  <Col xs={6}>
                                    <Field
                                      name={`broker_operator[${i}].id`}
                                      component={renderInput}
                                      label={"ID"}
                                      type="text"
                                      placeholder={"ID" + " " + (i + 1)}
                                      requiredStar
                                      groupClass="mb-0"
                                      inputClass={inputClass}
                                    />
                                    {props.errors &&
                                      props.errors.broker_operator &&
                                      props.errors.broker_operator[i] &&
                                      props.errors.broker_operator[i]["id"] &&
                                      props.touched &&
                                      props.touched.broker_operator &&
                                      props.touched.broker_operator[i] &&
                                      props.touched.broker_operator[i][
                                        "id"
                                      ] && (
                                        <span
                                          className="invalid-feedback p-0"
                                          style={{ display: "block" }}
                                        >
                                          {
                                            props.errors.broker_operator[i][
                                              "id"
                                            ]
                                          }
                                        </span>
                                      )}
                                  </Col>
                                  <Col xs={6}>
                                    <div className="buttondimention">
                                      {i !== 0 && (
                                        <button
                                          type="button"
                                          className="button button-remove"
                                          onClick={() => remove(i)}
                                        ></button>
                                      )}
                                    </div>
                                  </Col>
                                  <Col xs={6}>
                                    <Field
                                      name={`broker_operator[${i}].name`}
                                      component={renderInput}
                                      label={"Name"}
                                      type="text"
                                      placeholder={"Name" + " " + (i + 1)}
                                      requiredStar
                                      groupClass="mb-0"
                                      inputClass={inputClass}
                                    />
                                    {props.errors &&
                                      props.errors.broker_operator &&
                                      props.errors.broker_operator[i] &&
                                      props.errors.broker_operator[i]["name"] &&
                                      props.touched &&
                                      props.touched.broker_operator &&
                                      props.touched.broker_operator[i] &&
                                      props.touched.broker_operator[i][
                                        "name"
                                      ] && (
                                        <span
                                          className="invalid-feedback p-0"
                                          style={{ display: "block" }}
                                        >
                                          {
                                            props.errors.broker_operator[i][
                                              "name"
                                            ]
                                          }
                                        </span>
                                      )}
                                  </Col>
                                  <Col xs={6}>
                                    <Field
                                      name={`broker_operator[${i}].topic`}
                                      component={renderInput}
                                      label={"Topic"}
                                      type="text"
                                      placeholder={"Topic" + " " + (i + 1)}
                                      requiredStar
                                      groupClass="mb-0"
                                      inputClass={inputClass}
                                    />
                                    {props.errors &&
                                      props.errors.broker_operator &&
                                      props.errors.broker_operator[i] &&
                                      props.errors.broker_operator[i][
                                        "topic"
                                      ] &&
                                      props.touched &&
                                      props.touched.broker_operator &&
                                      props.touched.broker_operator[i] &&
                                      props.touched.broker_operator[i][
                                        "topic"
                                      ] && (
                                        <span
                                          className="invalid-feedback p-0"
                                          style={{ display: "block" }}
                                        >
                                          {
                                            props.errors.broker_operator[i][
                                              "topic"
                                            ]
                                          }
                                        </span>
                                      )}
                                  </Col>
                                  <Col xs={12}>
                                    <hr
                                      style={{ border: "1px solid #e4e5e6" }}
                                    />
                                  </Col>
                                </Row>
                              );
                            }
                          )}

                        <Button
                          type="button"
                          className={"btn mt-3 text-capitalize float-right"}
                          onClick={() => push({ id: "", name: "", topic: "" })}
                          color="outline-primary"
                        >
                          Add Operator
                        </Button>
                      </div>
                    );
                  }}
                />
              </div>
            </Col>
          </Row>
        </>
      )}{" "}
    </CardBody>
  );
};

export default Step6;
