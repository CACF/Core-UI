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

import { Row,Col,Card,CardHeader,CardBody,Button,} from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Field, FieldArray } from "formik";
import renderInput from "../../../components/Form/RenderInput";
import RenderCheckbox from "../../../components/Form/RenderCheckbox";
import RenderSelect from "././../../../components/Form/RenderSelect";
export function errorClass(errors, touched, i) {
  return errors &&
    errors.conditions &&
    errors.conditions.dimension &&
    errors.conditions.dimension[i]["module"] &&
    touched &&
    errors.conditions &&
    touched.conditions.dimension &&
    touched.conditions.dimension[i]["module"]
    ? "is-invalid"
    : "";
}

const Dimensions = (props) => {
  return (
    <CardBody>
      <Row lg={12} sm={1}>
        <Col>
          <Card>
            <CardHeader>Dimensions</CardHeader>
            <CardBody>
              <div className="add-remove-wrap position-relative">
                <FieldArray
                  name={props.name}
                  render={({ insert, remove, push }) => {
                    return (
                      <div>
                        {props.conditions.dimension.length > 0 &&
                          props.conditions.dimension.map(
                            (conditions, index) => {
                              let inputClass = errorClass(
                                props.errors,
                                props.touched,
                                index
                              );

                              return (
                                <React.Fragment
                                  key={`${props.name}[${index}].module`}
                                >
                                  <Row>
                                    <Col xs={6}>
                                      <RenderSelect
                                        value={
                                          props.values.conditions[props.i]
                                            .dimension[index].module
                                        }
                                        onChange={props.setFieldValue}
                                        options={[
                                          {
                                            value: "daily_avg_uid",
                                            label: "Daily Avg Uid",
                                          },
                                          {
                                            value: "duplicate_daily_avg",
                                            label: "Duplicate Daily Avg",
                                          },
                                          {
                                            value: "duplicate_threshold",
                                            label: "Duplicate Threshold",
                                          },
                                          {
                                            value: "exists_in_barred_list",
                                            label: "Exists In Barred List",
                                          },
                                          {
                                            value: "exists_in_monitoring_list",
                                            label: "Exists In Monitoring List",
                                          },
                                          {
                                            value: "gsma_not_found",
                                            label: "Gsma Not Found",
                                          },
                                          {
                                            value: "inconsistent_rat",
                                            label: "Inconsistent Rat",
                                          },
                                          {
                                            value: "is_barred_tac",
                                            label: "Is Barred Tac",
                                          },
                                          {
                                            value: "is_test_tac",
                                            label: "Is Test Tac",
                                          },
                                          {
                                            value: "malformed_imei",
                                            label: "Malformed Imei",
                                          },
                                          {
                                            value: "not_on_association_list",
                                            label: "Not On Association List",
                                          },
                                          {
                                            value: "stolen_list",
                                            label: "Stolen List",
                                          },
                                          {
                                            value: "transient_imei",
                                            label: "Transient Imei",
                                          },
                                          {
                                            value: "used_by_dirbs_subscriber",
                                            label: "Used By Dirbs Subscriber",
                                          },
                                          {
                                            value:
                                              "used_by_international_roamer",
                                            label:
                                              "Used By International Roamer",
                                          },
                                          {
                                            value:
                                              "used_by_local_non_dirbs_roamer",
                                            label:
                                              "Used By Local Non Dirbs Roamer",
                                          },
                                        ]}
                                        onBlur={props.setFieldTouched}
                                        // error={props.errors.conditions !==undefined &&  props.errors.conditions[props.i].dimension[index]['module']}
                                        touched={props.touched.conditions}
                                        fieldName={`${props.name}[${index}].module`}
                                        label={"Select Module : " + (index + 1)}
                                        placeholder={"Select Module"}
                                        stayOpen={true}
                                        multi={true}
                                      />
                                      {props.i !== undefined &&
                                        props.errors !== undefined &&
                                        props.errors.conditions !== undefined &&
                                        props.errors.conditions[props.i] !==
                                          undefined &&
                                        props.errors.conditions[props.i]
                                          .dimension &&
                                        props.errors.conditions[props.i]
                                          .dimension[index] !== undefined &&
                                        props.errors.conditions[props.i]
                                          .dimension[index]["module"] !==
                                          undefined &&
                                        props.touched &&
                                        props.touched.conditions &&
                                        props.touched.conditions[props.i] !==
                                          undefined &&
                                        props.touched.conditions[props.i]
                                          .dimension &&
                                        props.touched.conditions[props.i]
                                          .dimension[index] !== undefined &&
                                        props.touched.conditions[props.i]
                                          .dimension[index]["module"] !==
                                          undefined && (
                                          <span
                                            className="invalid-feedback p-0"
                                            style={{ display: "block" }}
                                          >
                                            {props.errors.conditions[props.i]
                                              .dimension[index]["module"] !==
                                              undefined &&
                                              props.errors.conditions[props.i]
                                                .dimension[index]["module"]}
                                          </span>
                                        )}
                                    </Col>
                                    <Col xs={6}>
                                      <div className="buttondimention float-right">
                                        {index !== 0 && (
                                          <button
                                            id={index}
                                            type="button"
                                            className="button button-remove"
                                            onClick={() => {
                                              remove(index);
                                            }}
                                          ></button>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                  {(props.values.conditions[props.i].dimension[
                                    index
                                  ].module.value === "daily_avg_uid" ||
                                    props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value === "duplicate_daily_avg" ||
                                    props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value === "duplicate_threshold" ||
                                    props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value === "transient_imei" ||
                                    props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value ===
                                      "used_by_dirbs_subscriber" ||
                                    props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value ===
                                      "used_by_international_roamer" ||
                                    props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value ===
                                      "exists_in_monitoring_list" ||
                                    props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value === "gsma_not_found") && (
                                    <h5 className="mt-3">Parameters : </h5>
                                  )}
                                  <Row className="mt-3">
                                    {(props.values.conditions[props.i]
                                      .dimension[index].module.value ===
                                      "daily_avg_uid" ||
                                      props.values.conditions[props.i]
                                        .dimension[index].module.value ===
                                        "duplicate_daily_avg" ||
                                      props.values.conditions[props.i]
                                        .dimension[index].module.value ===
                                        "duplicate_threshold") && (
                                      <>
                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].threshold`}
                                            component={renderInput}
                                            label={"Threshold"}
                                            type="number"
                                            placeholder={"Threshold"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            Object.keys(
                                              props.values.conditions[props.i]
                                                .dimension[index]
                                            ).length > 0 &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index]["threshold"] !==
                                              undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index]["threshold"] !==
                                              undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "threshold"
                                                ] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "threshold"
                                                  ]}
                                              </span>
                                            )}
                                        </Col>
                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].period_days`}
                                            component={renderInput}
                                            label={"Period Days"}
                                            type="number"
                                            min="0"
                                            disable={
                                              props.values.conditions[props.i].dimension[index].period_months ? true : false 
                                            }
                                            placeholder={"Period Days" + " "}
                                            requiredStar
                                            groupClass="mb-0"
                                            di
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "period_days"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "period_days"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "period_days"
                                                ] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "period_days"
                                                  ]}
                                              </span>
                                            )}
                                        </Col>

                                        <Col xs={6} className="mt-3">
                                          <Field
                                            name={`${props.name}[${index}].period_months`}
                                            component={renderInput}
                                            label={"Period Months"}
                                            type="number"
                                            min="0"
                                            placeholder={"Period Months"}
                                            disable={
                                              props.values.conditions[props.i].dimension[index].period_days ? true : false 

                                            }
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "period_months"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "period_months"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "period_months"
                                                ] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "period_months"
                                                  ]}
                                              </span>
                                            )}
                                        </Col>
                                        {(props.values.conditions[props.i]
                                          .dimension[index].module.value ===
                                          "daily_avg_uid" ||
                                          props.values.conditions[props.i]
                                            .dimension[index].module.value ===
                                            "duplicate_daily_avg") && (
                                          <Col xs={6} className="mt-3">
                                            <Field
                                              name={`${props.name}[${index}].min_seen_days`}
                                              component={renderInput}
                                              label={"Min Seen Days"}
                                              type="number"
                                              min="0"
                                              placeholder={"Min Seen Days"}
                                              requiredStar
                                              groupClass="mb-0"
                                              // inputClass={inputClass}
                                            />
                                            {props.errors &&
                                              props.errors.conditions &&
                                              props.errors.conditions[
                                                props.i
                                              ] &&
                                              props.errors.conditions[props.i]
                                                .dimension &&
                                              props.errors.conditions[props.i]
                                                .dimension[index] !==
                                                undefined &&
                                              props.errors.conditions[props.i]
                                                .dimension[index][
                                                "min_seen_days"
                                              ] !== undefined &&
                                              props.touched &&
                                              props.touched.conditions &&
                                              props.touched.conditions[
                                                props.i
                                              ] &&
                                              props.touched.conditions[props.i]
                                                .dimension &&
                                              props.touched.conditions[props.i]
                                                .dimension[index] !==
                                                undefined &&
                                              props.touched.conditions[props.i]
                                                .dimension[index][
                                                "min_seen_days"
                                              ] !== undefined && (
                                                <span
                                                  className="invalid-feedback p-0"
                                                  style={{ display: "block" }}
                                                >
                                                  {props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "min_seen_days"
                                                  ] !== undefined &&
                                                    props.errors.conditions[
                                                      props.i
                                                    ].dimension[index][
                                                      "min_seen_days"
                                                    ]}
                                                </span>
                                              )}
                                          </Col>
                                        )}
                                        {(props.values.conditions[props.i]
                                          .dimension[index].module.value ===
                                          "duplicate_daily_avg" ||
                                          props.values.conditions[props.i]
                                            .dimension[index].module.value ===
                                            "duplicate_threshold") && (
                                          <Col xs={6} className="mt-5">
                                            <Field
                                              name={`${props.name}[${index}].use_msisdn`}
                                              component={RenderCheckbox}
                                              label={"Use MSISDN"}
                                              requiredStar
                                              groupClass="mb-0"
                                              // inputClass={inputClass}
                                            />
                                          </Col>
                                        )}
                                      </>
                                    )}
                                    {props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value === "transient_imei" && (
                                      <>
                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].period`}
                                            component={renderInput}
                                            label={"Period"}
                                            type="number"
                                            placeholder={"Period" + " "}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index]["period"] !==
                                              undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index]["period"] !==
                                              undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index]["period"] !==
                                                  undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index]["period"]}
                                              </span>
                                            )}
                                        </Col>
                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].num_msisdns`}
                                            component={renderInput}
                                            label={"Num MSISDNS"}
                                            type="number"
                                            placeholder={"Num MSISDNS"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "num_msisdns"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "num_msisdns"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "num_msisdns"
                                                ] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "num_msisdns"
                                                  ]}
                                              </span>
                                            )}
                                        </Col>
                                      </>
                                    )}
                                    {(props.values.conditions[props.i]
                                      .dimension[index].module.value ===
                                      "used_by_dirbs_subscriber" ||
                                      props.values.conditions[props.i]
                                        .dimension[index].module.value ===
                                        "used_by_international_roamer" ||
                                      props.values.conditions[props.i]
                                        .dimension[index].module.value ===
                                        "used_by_local_non_dirbs_roamer") && (
                                      <>
                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].lookback_days`}
                                            component={renderInput}
                                            label={"Lookback Days"}
                                            type="number"
                                            min="0"
                                            placeholder={"Lookback Days"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "lookback_days"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "lookback_days"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "lookback_days"
                                                ] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "lookback_days"
                                                  ]}
                                              </span>
                                            )}
                                        </Col>
                                      </>
                                    )}
                                    {props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value ===
                                      "exists_in_monitoring_list" && (
                                      <>
                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].monitored_days`}
                                            component={renderInput}
                                            label={"Monitored Days"}
                                            type="number"
                                            min="0"
                                            placeholder={"Monitored Days"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "monitored_days"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "monitored_days"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "monitored_days"
                                                ] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "monitored_days"
                                                  ]}
                                              </span>
                                            )}
                                        </Col>
                                      </>
                                    )}
                                    {props.values.conditions[props.i].dimension[
                                      index
                                    ].module.value === "gsma_not_found" && (
                                      <>
                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].rbi_delays.ignore_rbi_delays`}
                                            component={RenderCheckbox}
                                            label={"Ignore RBI Delays"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                        </Col>
                                        <Col xs={6}></Col>
                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].rbi_delays.rbi_00`}
                                            component={renderInput}
                                            label={"00"}
                                            type="number"
                                            placeholder={"00"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_00"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_00"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "rbi_delays"
                                                ]["rbi_00"] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "rbi_delays"
                                                  ]["rbi_00"]}
                                              </span>
                                            )}
                                        </Col>

                                        <Col xs={6}>
                                          <Field
                                            name={`${props.name}[${index}].rbi_delays.rbi_01`}
                                            component={renderInput}
                                            label={"01"}
                                            type="number"
                                            placeholder={"01"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_01"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_01"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "rbi_delays"
                                                ]["rbi_01"] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "rbi_delays"
                                                  ]["rbi_01"]}
                                              </span>
                                            )}
                                        </Col>
                                        <Col xs={6} className="mt-2">
                                          <Field
                                            name={`${props.name}[${index}].rbi_delays.rbi_35`}
                                            component={renderInput}
                                            label={"35"}
                                            type="number"
                                            placeholder={"35"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_35"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_35"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "rbi_delays"
                                                ]["rbi_35"] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "rbi_delays"
                                                  ]["rbi_01"]}
                                              </span>
                                            )}
                                        </Col>
                                        <Col xs={6} className="mt-2">
                                          <Field
                                            name={`${props.name}[${index}].rbi_delays.rbi_86`}
                                            component={renderInput}
                                            label={"86"}
                                            type="number"
                                            placeholder={"86"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_86"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_86"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "rbi_delays"
                                                ]["rbi_86"] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "rbi_delays"
                                                  ]["rbi_86"]}
                                              </span>
                                            )}
                                        </Col>
                                        <Col xs={6} className="mt-2">
                                          <Field
                                            name={`${props.name}[${index}].rbi_delays.rbi_91`}
                                            component={renderInput}
                                            label={"91"}
                                            type="number"
                                            placeholder={"91"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_91"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_91"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "rbi_delays"
                                                ]["rbi_91"] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "rbi_delays"
                                                  ]["rbi_91"]}
                                              </span>
                                            )}
                                        </Col>
                                        <Col xs={6} className="mt-2">
                                          <Field
                                            name={`${props.name}[${index}].rbi_delays.rbi_99`}
                                            component={renderInput}
                                            label={"99"}
                                            type="number"
                                            placeholder={"99"}
                                            requiredStar
                                            groupClass="mb-0"
                                            // inputClass={inputClass}
                                          />
                                          {props.errors &&
                                            props.errors.conditions &&
                                            props.errors.conditions[props.i] &&
                                            props.errors.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.errors.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_99"
                                            ] !== undefined &&
                                            props.touched &&
                                            props.touched.conditions &&
                                            props.touched.conditions[props.i] &&
                                            props.touched.conditions[props.i]
                                              .dimension &&
                                            props.touched.conditions[props.i]
                                              .dimension[index] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index][
                                              "rbi_delays"
                                            ] !== undefined &&
                                            props.touched.conditions[props.i]
                                              .dimension[index]["rbi_delays"][
                                              "rbi_99"
                                            ] !== undefined && (
                                              <span
                                                className="invalid-feedback p-0"
                                                style={{ display: "block" }}
                                              >
                                                {props.errors.conditions[
                                                  props.i
                                                ].dimension[index][
                                                  "rbi_delays"
                                                ]["rbi_99"] !== undefined &&
                                                  props.errors.conditions[
                                                    props.i
                                                  ].dimension[index][
                                                    "rbi_delays"
                                                  ]["rbi_99"]}
                                              </span>
                                            )}
                                        </Col>
                                      </>
                                    )}
                                  </Row>
                                  <Col>
                                    <hr />
                                  </Col>
                                </React.Fragment>
                              );
                            }
                          )}
                        <Button
                          type="button"
                          className={"btn mt-3 text-capitalize float-right"}
                          onClick={() => {
                            push({
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
                            });
                          }}
                          color="outline-primary"
                        >
                          +
                        </Button>
                      </div>
                    );
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CardBody>
  );
};

export default Dimensions;
