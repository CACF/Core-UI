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
import TooltipMessage from "../../../components/Form/TooltipMessage";

export function errorClass(errors, touched, i) {
    return errors &&
      errors.region_operator &&
      errors.region_operator[i] &&
      errors.region_operator[i]["paths"] &&
      touched &&
      touched.region_operator &&
      touched.region_operator[i] &&
      touched.region_operator[i]["paths"]
      ? "is-invalid"
      : "";
}
const Step5 = (props) => {
  return (
    <CardBody>
      <h5>Catalog :</h5>

      <Row lg={12} sm={1}>
        <Col md={10}>
          <div className="col-sm-10 mt-2 ml-3">
            <Field
              requiredStar
              name="perform_prevalidation"
              component={RenderCheckbox}
              type="checkbox"
              label="Perform Prevalidation"
              placeholder="Perform Prevalidation"
            />
          </div>
        </Col>
        <Col md={{ size: 10, offset: 1 }}>
          <div className="add-remove-wrap position-relative">
            <FieldArray
              name="catalog"
              render={({ insert, remove, push }) => {
                return (
                  <div>
                    {props.values.catalog &&
                      props.values.catalog.length > 0 &&
                      props.values.catalog.map((catalog, i) => {
                        let inputClass = errorClass(
                          props.errors,
                          props.touched,
                          i
                        );
                        return (
                          <React.Fragment key={i}>
                            <Row className="mt-3 ">
                              <Col xs={12}>
                                <h6>Prospectors {i + 1} : </h6>
                              </Col>
                            </Row>

                            <Row>
                              {" "}
                              <Col xs={6}>
                                <div className="col-sm-12">
                                  <RenderSelect
                                    value={props.values.catalog[i]["file_type"]}
                                    onChange={props.setFieldValue}
                                    options={[
                                      {
                                        label: "Barred List",
                                        value: "barred_list",
                                      },
                                      {
                                        label: "Barred Tac List",
                                        value: "barred_tac_list ",
                                      },
                                      {
                                        label: "Device Association List",
                                        value: "device_association_list",
                                      },
                                      {
                                        label: "Golden List",
                                        value: "golden_list",
                                      },
                                      { label: "GSMA TAC", value: "gsma_TAC" },
                                      {
                                        label: "Monitoring List",
                                        value: "monitoring_list",
                                      },
                                      { label: "Operator", value: "operator" },
                                      {
                                        label: "Pairing List",
                                        value: "pairing_list ",
                                      },
                                      {
                                        label: "Registration List",
                                        value: "registration_list",
                                      },
                                      {
                                        label: "Stolen List",
                                        value: "stolen_list",
                                      },
                                      {
                                        label: "Subscribers Registration List ",
                                        value: "subscribers_registration_list",
                                      },
                                    ]}
                                    onBlur={props.setFieldTouched}
                                    // error={props.errors.catalog}
                                    touched={props.touched.catalog}
                                    fieldName={`catalog[${i}].file_type`}
                                    label={"Select File Type"}
                                    placeholder={"Select File Type"}
                                    stayOpen={true}
                                  />
                                </div>
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
                              <Col xs={6} className="mt-3">
                                <div className="col-sm-12">
                                  <Field
                                    name={`catalog[${i}].paths`}
                                    component={renderInput}
                                    label={"Paths"}
                                    type="text"
                                    placeholder={"Paths" + " " + (i + 1)}
                                    groupClass="mb-0"
                                    inputClass={inputClass}
                                  />
                                
                                {props.errors &&
                                    props.errors.catalog &&
                                    props.errors.catalog[i] &&
                                    props.errors.catalog[i]["paths"] &&
                                    props.touched &&
                                    props.touched.catalog &&
                                    props.touched.catalog[i] &&
                                    props.touched.catalog[i]["paths"] && (
                                      <span
                                        className="invalid-feedback p-0"
                                        style={{ display: "block" }}
                                      >
                                        {props.errors.catalog[i]["paths"]}
                                      </span>
                                    )}
                                    </div>
                              </Col>
                              <Col xs={6} className="mt-3">
                                <div className="col-sm-12">
                                  <Field
                                    name={`catalog[${i}].schema_filename`}
                                    component={renderInput}
                                    label={"Schema Filename"}
                                    type="text"
                                    placeholder={
                                      "Schema Filename" + " " + (i + 1)
                                    }
                                    groupClass="mb-0"
                                    inputClass={inputClass}
                                  />
                                
                                {props.errors &&
                                    props.errors.catalog &&
                                    props.errors.catalog[i] &&
                                    props.errors.catalog[i]["schema_filename"] &&
                                    props.touched &&
                                    props.touched.catalog &&
                                    props.touched.catalog[i] &&
                                    props.touched.catalog[i]["schema_filename"] && (
                                      <span
                                        className="invalid-feedback p-0"
                                        style={{ display: "block" }}
                                      >
                                        {props.errors.catalog[i]["schema_filename"]}
                                      </span>
                                    )}
                                    </div>
                              </Col>
                              <Col xs={12}>
                                <hr />
                              </Col>
                            </Row>
                          </React.Fragment>
                        );
                      })}
                    <Button
                      type="button"
                      className={"btn mt-3 text-capitalize float-right"}
                      onClick={() =>
                        push({ file_type: "", paths: "", schema_filename: "" })
                      }
                      color="outline-primary"
                    >
                      {"Add Prospector"}
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

export default Step5;
