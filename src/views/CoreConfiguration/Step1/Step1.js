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
import { Row, Col, CardBody, Button } from "reactstrap";
import TooltipMessage from "././../../../components/Form/TooltipMessage";
import RenderCheckbox from "././../../../components/Form/RenderCheckbox";
import renderInput from "././../../../components/Form/RenderInput";
import RenderSelect from "././../../../components/Form/RenderSelect";
import { Field, FieldArray } from "formik";
import { region } from "./Region";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
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

const Step1 = (props) => {
  const setCountryCode = () => {
    let country = [];
    region.map((name) => {
      country.push({ value: name.dial_code, label: name.dial_code });
    });
    return country;
  };
  const setCountryName = () => {
    let country = [];

    region.map((name) => {
      country.push({ value: name.name, label: name.name });
    });
    return country;
  };
  return (
    <>
      <CardBody>
        <h5> Postgresql Information :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10 mt-2">
              <Field
                requiredStar
                name="databasename"
                component={renderInput}
                type="text"
                label="Database Name"
                placeholder="Database Name"
              />
              <TooltipMessage
                id="databasename"
                type="inputTooltip"
                showInfo="Database name (an empty database on the first run). Overridden by environment.
                                  variable DIRBS_DB_DATABASE if set."
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="host"
                component={renderInput}
                type="text"
                label="Host"
                placeholder="Host"
              />
              <TooltipMessage
                id="host"
                type="inputTooltip"
                showInfo="Host that the PostgreSQL server runs on. Overridden by environment.
                variable DIRBS_DB_HOST if set."
              />
            </div>
          </Col>
        </Row>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="port"
                component={renderInput}
                type="text"
                label="Port"
                placeholder="Port"
              />
              <TooltipMessage
                id="port"
                type="inputTooltip"
                showInfo="PostgreSQL port if not running on standard port of 5432. Overridden by environment
                variable DIRBS_DB_PORT if set."
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="user"
                component={renderInput}
                type="text"
                label="User"
                placeholder="User"
              />
              <TooltipMessage
                id="user"
                type="inputTooltip"
                showInfo="Database role/user that DIRBS will connect to PostgreSQL as. Overridden by environment
                variable DIRBS_DB_USER if set."
              />
            </div>
          </Col>
        </Row>

        <hr></hr>
        <h5> Region Information :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <RenderSelect
                value={props.values.regionname}
                onChange={props.setFieldValue}
                options={setCountryName()}
                onBlur={props.setFieldTouched}
                error={props.errors.regionname}
                touched={props.touched.regionname}
                fieldName="regionname"
                label={"Select Region Name"}
                placeholder={"Select Region Name"}
                requiredStar
                stayOpen={true}
                multi={true}
              />
              <TooltipMessage
                id="regionname"
                type="inputTooltip"
                showInfo="Region Name is used for the country level report."
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="col-sm-10 mt-2">
              <RenderSelect
                value={props.values.countryCode}
                onChange={props.setFieldValue}
                options={setCountryCode()}
                onBlur={props.setFieldTouched}
                error={props.errors.countryCode}
                touched={props.touched.countryCode}
                fieldName="countryCode"
                label={"Select Country Code"}
                placeholder={"Select Country Code"}
                requiredStar
                stayOpen={true}
                multi={true}
              />

              <TooltipMessage
                id="countryCode"
                type="inputTooltip"
                showInfo="country_codes are used to validate MSISDNs during operator data import."
              />
            </div>
          </Col>
        </Row>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                name="exemptedDevice"
                component={renderInput}
                type="input"
                label={"Exempted device type"}
                placeholder={"Exempted device type"}
              />
              <TooltipMessage
                id="exemptedDevice"
                type="inputTooltip"
                showInfo="Exempted device types contains a list of GSMA device types that do not require
                registration in this country."
              />
            </div>
          </Col>

          <Col md={6} className="mt-3">
            <div className="col-sm-10">
              <Field
                requiredStar
                name="msisdnData"
                component={RenderCheckbox}
                label="Do you want to import MSISDN Data"
              />
              <TooltipMessage
                id="msisdnData"
                type="checkboxTooltip"
                showInfo="Whether or not MSISDN data is present and should be imported for this region."
              />
            </div>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="rad"
                component={RenderCheckbox}
                label="Do you want to import radio access data"
              />
              <TooltipMessage
                id="rad"
                type="checkboxTooltip"
                showInfo=" Whether or not RAT data is present and should be imported for this region."
              />
            </div>
          </Col>
        </Row>

        <h5 className="ml-4">Operators :</h5>

        <Row lg={12} sm={1}>
          <Col md={{ size: 10, offset: 1 }}>
            <div className="add-remove-wrap position-relative">
              <FieldArray
                name="region_operator"
                render={({ insert, remove, push }) => {
                  return (
                    <div>
                      {props.values.region_operator &&
                        props.values.region_operator.length >= 0 &&
                        props.values.region_operator.map(
                          (region_operator, i) => {
                            let inputClass = errorClass(
                              props.errors,
                              props.touched,
                              i
                            );

                            return (
                              <Row key={i} className="mt-3 ">
                                <Col xs={6}>
                                  <Field
                                    name={`region_operator[${i}].id`}
                                    component={renderInput}
                                    label={"ID"}
                                    type="text"
                                    placeholder={"ID" + " " + (i + 1)}
                                    requiredStar
                                    groupClass="mb-0"
                                    inputClass={inputClass}
                                  />
                                  {props.errors &&
                                    props.errors.region_operator &&
                                    props.errors.region_operator[i] &&
                                    props.errors.region_operator[i]["id"] &&
                                    props.touched &&
                                    props.touched.region_operator &&
                                    props.touched.region_operator[i] &&
                                    props.touched.region_operator[i]["id"] && (
                                      <span
                                        className="invalid-feedback p-0"
                                        style={{ display: "block" }}
                                      >
                                        {props.errors.region_operator[i]["id"]}
                                      </span>
                                    )}
                                </Col>
                                <Col xs={6}>
                                  <Field
                                    name={`region_operator[${i}].name`}
                                    component={renderInput}
                                    label={"Name"}
                                    type="text"
                                    placeholder={"Name" + " " + (i + 1)}
                                    requiredStar
                                    groupClass="mb-0"
                                    inputClass={inputClass}
                                  />
                                  {props.errors &&
                                    props.errors.region_operator &&
                                    props.errors.region_operator[i] &&
                                    props.errors.region_operator[i]["name"] &&
                                    props.touched &&
                                    props.touched.region_operator &&
                                    props.touched.region_operator[i] &&
                                    props.touched.region_operator[i][
                                      "name"
                                    ] && (
                                      <span
                                        className="invalid-feedback p-0"
                                        style={{ display: "block" }}
                                      >
                                        {
                                          props.errors.region_operator[i][
                                            "name"
                                          ]
                                        }
                                      </span>
                                    )}
                                </Col>
                                <Col xs={6} className="mt-3">
                                  <Field
                                    name={`region_operator[${i}].mcc`}
                                    component={renderInput}
                                    label={"MCC"}
                                    type="text"
                                    placeholder={"MCC" + " " + (i + 1)}
                                    requiredStar
                                    groupClass="mb-0"
                                    inputClass={inputClass}
                                  />
                                  {props.errors &&
                                    props.errors.region_operator &&
                                    props.errors.region_operator[i] &&
                                    props.errors.region_operator[i]["mcc"] &&
                                    props.errors.region_operator[i]["mcc"] &&
                                    props.touched &&
                                    props.touched.region_operator &&
                                    props.touched.region_operator[i] &&
                                    props.touched.region_operator[i]["mcc"] && (
                                      <span
                                        className="invalid-feedback p-0"
                                        style={{ display: "block" }}
                                      >
                                        {props.errors.region_operator[i]["mcc"]}
                                      </span>
                                    )}
                                </Col>
                                <Col xs={6} className="mt-3">
                                  <div className="buttonbox">
                                    <Field
                                      name={`region_operator[${i}].mnc`}
                                      component={renderInput}
                                      label={"MNC"}
                                      type="text"
                                      placeholder={"MNC" + " " + (i + 1)}
                                      requiredStar
                                      groupClass="mb-0"
                                      inputClass={inputClass}
                                    />

                                    {props.errors &&
                                      props.errors.region_operator &&
                                      props.errors.region_operator[i] &&
                                      props.errors.region_operator[i]["mnc"] &&
                                      props.touched &&
                                      props.touched.region_operator &&
                                      props.touched.region_operator[i] &&
                                      props.touched.region_operator[i][
                                        "mnc"
                                      ] && (
                                        <span
                                          className="invalid-feedback p-0"
                                          style={{ display: "block" }}
                                        >
                                          {
                                            props.errors.region_operator[i][
                                              "mnc"
                                            ]
                                          }
                                        </span>
                                      )}
                                     
                                    {i !== 0 && (
                                      <button
                                        type="button"
                                        className="button button-remove"
                                        onClick={() => remove(i)}
                                      ></button>
                                    )}
                                  </div>
                                </Col>
                                <Col xs={12}>
                                     <hr />
                                     </Col>
                              </Row>
                            );
                          }
                        )}

                      <Button
                        type="button"
                        className={
                         
                             "btn mt-3 text-capitalize float-right"
                        }
                        onClick={() =>
                          push({ id: "", name: "", mcc: "", mnc: "" })
                        }
                        color="outline-primary"
                      >
                        {"Add Operator"}
                      </Button>
                    </div>
                  );
                }}
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </>
  );
};

export default Step1;
