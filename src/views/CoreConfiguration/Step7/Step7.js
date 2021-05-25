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

import React, { useEffect } from "react";

import { Row, Col, CardBody, Button } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Field, FieldArray } from "formik";
import renderInput from "../../../components/Form/RenderInput";
import RenderCheckbox from "../../../components/Form/RenderCheckbox";
import TooltipMessage from "././../../../components/Form/TooltipMessage";
import Dimensions from "./Dimensions";
export function errorClass(errors, touched, i) {
  return errors &&
    errors.conditions &&
    errors.conditions[i] &&
    errors.conditions[i]["label"] &&
    touched &&
    touched.conditions &&
    touched.conditions[i] &&
    touched.conditions[i]["label"]
    ? "is-invalid"
    : "";
}

const Step7 = (props) => {
  useEffect(() => {
    props.setFieldTouched("conditions[0].label", true);
  }, []);

  return (
    <CardBody>
      <Row lg={12} sm={1}>
        <Col md={{ size: 10, offset: 1 }}>
          <div className="add-remove-wrap position-relative">
            <FieldArray
              name="conditions"
              render={({ insert, remove, push }) => {
                return (
                  <div>
                    {props.values.conditions &&
                      props.values.conditions.length > 0 &&
                      props.values.conditions.map((condition, i) => {
                        let inputClass = errorClass(
                          props.errors,
                          props.touched,
                          i
                        );
                        return (
                          <Row key={`conditions-${i}`} className="mt-3 ">
                            <Col>
                              <h5>Condition : {i + 1} </h5>
                            </Col>
                            <Col xs={6}></Col>
                            <Col xs={6} className="mt-2">
                              <div className="col-sm-12">
                                <Field
                                  name={`conditions[${i}].label`}
                                  component={renderInput}
                                  label={"Label"}
                                  type="text"
                                  placeholder={"Label" + " " + (i + 1)}
                                  requiredStar
                                  groupClass="mb-0"
                                  inputClass={inputClass}
                                />
                                {props.errors &&
                                  props.errors.conditions &&
                                  props.errors.conditions[i] &&
                                  props.errors.conditions[i]["label"] &&
                                  props.touched &&
                                  props.touched.conditions &&
                                  props.touched.conditions[i] &&
                                  props.touched.conditions[i]["label"] && (
                                    <span
                                      className="invalid-feedback p-0"
                                      style={{ display: "block" }}
                                    >
                                      {props.errors.conditions[i]["label"]}
                                    </span>
                                  )}
                                <TooltipMessage
                                  id="labeltext"
                                  type="inputTooltip"
                                  showInfo="A name for the condition. This is the id/key for the condition. If
                                    this is changed, all previous classifications will be reset. Likewise,
                                   if you change the dimensions but keep the condition label the same,
                                     existing classifications for that condition will be retained."
                                />{" "}
                              </div>
                            </Col>

                            <Col xs={6} className="mt-2">
                              <div className="col-sm-12">
                                <Field
                                  name={`conditions[${i}].grace_period_days`}
                                  component={renderInput}
                                  label={"Grace Period Days"}
                                  type="number"
                                  min="0"
                                  placeholder={
                                    "Grace Period Days" + " " + (i + 1)
                                  }
                                  requiredStar
                                  groupClass="mb-0"
                                  inputClass={inputClass}
                                />
                                {props.errors &&
                                  props.errors.conditions &&
                                  props.errors.conditions[i] &&
                                  props.errors.conditions[i][
                                    "grace_period_days"
                                  ] &&
                                  props.touched &&
                                  props.touched.conditions &&
                                  props.touched.conditions[i] &&
                                  props.touched.conditions[i][
                                    "grace_period_days"
                                  ] && (
                                    <span
                                      className="invalid-feedback p-0"
                                      style={{ display: "block" }}
                                    >
                                      {
                                        props.errors.conditions[i][
                                          "grace_period_days"
                                        ]
                                      }
                                    </span>
                                  )}
                                <TooltipMessage
                                  id="grace_period_days"
                                  type="inputTooltip"
                                  showInfo="The integer number of days that an IMEI failing
                                    this condition will remain on the notification list before moving
                                     to the black list."
                                />{" "}
                              </div>
                            </Col>
                            <Col xs={6} className="mt-3">
                              <div className="col-sm-12">
                                <Field
                                  name={`conditions[${i}].max_allowed_matching_ratio`}
                                  component={renderInput}
                                  label={"Max Allowed Matching Ratio"}
                                  type="text"
                                  placeholder={
                                    "Max Allowed Matching Ratio" + " " + (i + 1)
                                  }
                                  requiredStar
                                  groupClass="mb-0"
                                  inputClass={inputClass}
                                />
                                {props.errors &&
                                  props.errors.conditions &&
                                  props.errors.conditions[i] &&
                                  props.errors.conditions[i][
                                    "max_allowed_matching_ratio"
                                  ] &&
                                  props.touched &&
                                  props.touched.conditions &&
                                  props.touched.conditions[i] &&
                                  props.touched.conditions[i][
                                    "max_allowed_matching_ratio"
                                  ] && (
                                    <span
                                      className="invalid-feedback p-0"
                                      style={{ display: "block" }}
                                    >
                                      {
                                        props.errors.conditions[i][
                                          "max_allowed_matching_ratio"
                                        ]
                                      }
                                    </span>
                                  )}
                                <TooltipMessage
                                  id="max_allowed_matching_ratio"
                                  type="inputTooltip"
                                  showInfo="The maximum percentage of all-time seen IMEIs
                                    this condition is allowed to match. This is a safety check implemented
                                      to catch a missing GSMA TAC DB, registration list, etc."
                                />{" "}
                              </div>
                            </Col>
                            <Col xs={6} className="mt-3">
                              <div className="col-sm-12">
                                {" "}
                                <Field
                                  name={`conditions[${i}].reason`}
                                  component={renderInput}
                                  label={"Reason"}
                                  type="text"
                                  placeholder={"Reason" + " " + (i + 1)}
                                  requiredStar
                                  groupClass="mb-0"
                                  inputClass={inputClass}
                                />
                                {props.errors &&
                                  props.errors.conditions &&
                                  props.errors.conditions[i] &&
                                  props.errors.conditions[i]["reason"] &&
                                  props.touched &&
                                  props.touched.conditions &&
                                  props.touched.conditions[i] &&
                                  props.touched.conditions[i]["reason"] && (
                                    <span
                                      className="invalid-feedback p-0"
                                      style={{ display: "block" }}
                                    >
                                      {props.errors.conditions[i]["reason"]}
                                    </span>
                                  )}
                                <TooltipMessage
                                  id="reason"
                                  type="inputTooltip"
                                  showInfo="A string sent to the operators describing why the IMEI is
                                      to be blacklisted."
                                />{" "}
                              </div>
                            </Col>

                            <Col xs={6} className="mt-4">
                              <div className="col-sm-12">
                                <Field
                                  name={`conditions[${i}].blocking`}
                                  component={RenderCheckbox}
                                  label={"Blocking"}
                                  type="checkbox"
                                  placeholder={"Blocking" + " " + (i + 1)}
                                  requiredStar
                                  groupClass="mb-0"
                                  inputClass={inputClass}
                                />
                                {/* {props.errors &&
                                  props.errors.conditions &&
                                  props.errors.conditions[i] &&
                                  props.errors.conditions[i]["blocking"] &&
                                  props.touched &&
                                  props.touched.conditions &&
                                  props.touched.conditions[i] &&
                                  props.touched.conditions[i]["blocking"] && (
                                    <span
                                      className="invalid-feedback p-0"
                                      style={{ display: "block" }}
                                    >
                                      {props.errors.conditions[i]["blocking"]}
                                    </span>
                                  )} */}
                                <TooltipMessage
                                  id="blocking"
                                  type="checkboxTooltip"
                                  showInfo="A boolean stating whether this condition contributes to
                                      list generation or is simply informational. Information conditions
                                     can be used to try out new modules or to tweak parameters."
                                />{" "}
                              </div>
                            </Col>
                            <Col xs={6}></Col>

                            <Col xs={12}>
                              <Row lg={12} sm={1}>
                                <Dimensions
                                  name={`conditions[${i}].dimension`}
                                  i={i}
                                  conditions={condition}
                                  errors={props.errors}
                                  {...props}
                                />
                              </Row>
                            </Col>
                            <Col xs={6}>
                              <div className="buttoncondition float-right">
                                {i !== 0 && (
                                  <button
                                    type="button"
                                    className="button button-remove float-right"
                                    onClick={() => remove(i)}
                                  ></button>
                                )}
                              </div>
                            </Col>
                            <Col xs={12}>
                              <hr style={{ border: "1px solid #e4e5e6" }} />
                            </Col>
                          </Row>
                        );
                      })}
                    <Button
                      type="button"
                      className={"btn mt-3 text-capitalize float-right"}
                      onClick={() =>
                        push({
                          label: "",
                          grace_period_days: "",
                          max_allowed_matching_ratio: "",
                          reason: "",
                          blocking: false,
                          dimension: [
                            {
                              module: [],
                              threshold: "",
                              period_days: "",
                              min_seen_days: "",
                              period_months: "",
                              use_msisdn: false,
                              period: "",
                              num_msisdns: "",
                              lookback_days: "",
                              monitored_days: 0,
                              rbi_delays: {
                                ignore_rbi_delays: false,
                                rbi_00: 32,
                                rbi_01: 40,
                                rbi_35: 20,
                                rbi_86: 19,
                                rbi_91: 20,
                                rbi_99: 69,
                              },
                            },
                          ],
                        })
                      }
                      color="outline-primary"
                    >
                      Add Condition
                    </Button>
                  </div>
                );
              }}
            />
          </div>
        </Col>
      </Row>
    </CardBody>
  );
};

export default Step7;
