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

import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";
import { UncontrolledTooltip } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import YAML from "yaml";
import { CountryNameCode, getExtension } from "./../../utilities/helpers";
import moment from "moment";
import { withFormik } from "formik";
import { propsToValuesUpdated } from "./../../utilities/helpers";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import Step5 from "./Step5/Step5";
import Step6 from "./Step6/Step6";
import Step7 from "./Step7/Step7";
export function errorClass(errors, touched, i) {
  return errors &&
    errors.id &&
    errors.id[i] &&
    errors.id[i]["id"] &&
    touched &&
    touched.id &&
    touched.id[i] &&
    touched.id[i]["id"]
    ? "is-invalid"
    : "";
}
class MultiStepForm extends Component {
  constructor(props) {
    super(props);
    this.evaluationPeriod = React.createRef();
  }
  handleDisableCheck = () => {
    const { fileType, step, extensionError, data } = this.props;
    if (step === 7 && this.props.errors.conditions !== undefined) {
      let isValidatedArr = [];
      this.props.errors.conditions.forEach((element) => {
        isValidatedArr.push(
          Object.keys(element).length === 1 &&
            element.dimension !== undefined &&
            element.dimension.length === 0
        );
      });
      return isValidatedArr.includes(false);
    } else {
      if (fileType === "exitingFile") {
        return step === 0 &&
          fileType === "exitingFile" &&
          extensionError !== "" &&
          Object.keys(data).length === 0
          ? true
          : false;
        //  (
        //    step===0
        //    ?
        //    (fileType === "exitingFile" && extensionError !== "" && Object.keys(data).length === 0)
        //    ?
        //    true
        //    :false
        //    :!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object) ? true : false
        //    )
      } else {
        return this.props.step === 0
          ? this.props.fileType === "exitingFile" &&
            this.props.extensionError !== "" &&
            Object.keys(this.props.data).length === 0
            ? true
            : this.props.step === 0
            ? false
            : !this.props.isValid ||
              (Object.keys(this.props.touched).length === 0 &&
                this.props.touched.constructor === Object)
          : this.props.step === 0
          ? false
          : !this.props.isValid ||
            (Object.keys(this.props.touched).length === 0 &&
              this.props.touched.constructor === Object);
      }
    }
  };
  render() {
    const {
      handleSubmit,
      setFieldValue,
      values,
      errors,
      touched,
      setFieldTouched,
      step,
      isSubmitting,
      dirty,
    } = this.props;

    return (
      <>
        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <Step1
              values={values}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
          )}

          {step === 2 && (
            <Step2
              values={values}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
          )}

          {step === 3 && <Step3 />}

          {step === 4 && (
            <Step4
              values={values}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
          )}

          {step === 5 && (
            <Step5
              values={values}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
          )}
          {step === 6 && (
            <Step6
              values={values}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
          )}

          {step === 7 && (
            <Step7
              values={values}
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
          )}

          {step === 8 && (
            <CardBody>
              <div className="success-checkmark">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
              <h4 className="text-center">Configuration Completed!</h4>
              <span
                className="float-right"
                style={
                  step === 8
                    ? { position: "relative", top: "42px", right: "2px" }
                    : {}
                }
              >
                <Button
                  style={{ background: "#3f51b5" }}
                  type="submit"
                  onClick={errors && this.props.stepError(errors)}
                >
                  Finish and Download{" "}
                  <i className="fa fa-cloud-download" aria-hidden="true"></i>
                </Button>
              </span>{" "}
            </CardBody>
          )}
        </Form>
        <CardFooter style={{ backgroundColor: "white", border: "none" }}>
          <div
            className="float-right mt-0 "
            style={{ left: "800px", color: "red" }}
          >
            {this.props.step > 0 && (
              <Button
                className={"btn btn-info "}
                onClick={this.props.handleBackPage}
                style={
                  this.props.step === 8
                    ? {
                        position: "absolute",
                        right: "260px",
                        top: "213px",
                        backgroundColor: "#3f51b5",
                        width: "100px",
                      }
                    : { backgroundColor: "#3f51b5", width: "100px" }
                }
              >
                Back
              </Button>
            )}
            &nbsp; &nbsp; &nbsp;
            {this.props.step < 8 && (
              <Button
                className="btn"
                disabled={this.handleDisableCheck()}
                style={{ backgroundColor: "#3f51b5", width: "100px" }}
                onClick={this.props.handleNextPage}
              >
                Next{" "}
              </Button>
            )}
          </div>
        </CardFooter>
      </>
    );
  }
}

const EnhancedStepForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) =>
    props.fileType === "exitingFile"
      ? props.data
      : {
          //Step 1

          databasename: "dirbs",
          host: "localhost",
          port: 5432,
          user: "dirbs",
          regionname: [],
          countryCode: [],
          exemptedDevice: [],
          msisdnData: true,
          rad: true,
          region_operator: [{ id: "", name: "", mcc: "", mnc: "" }],
          // %(asctime)s - %(name)s - %(levelname)s - %(message)s
          //Step 2
          level: { value: "info", label: "Info" },
          format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
          show_statsd_messages: false,
          show_werkzeug_messages: false,
          show_sql_messages: false,
          log_directory: "/var/log/dirbs",
          file_prefix: "null",
          file_rotation_max_bytes: 100000000,
          file_rotation_backup_count: 100,

          null_imei_threshold: 0.05,
          null_imsi_threshold: 0.05,
          null_msisdn_threshold: 0.05,
          null_rat_threshold: 0.05,
          null_threshold: 0.05,
          unclean_imei_threshold: 0.05,
          unclean_imsi_threshold: 0.05,
          unclean_threshold: 0.05,
          out_of_region_imsi_threshold: 0.1,
          out_of_region_msisdn_threshold: 0.1,
          out_of_region_threshold: 0.1,
          non_home_network_threshold: 0.2,
          historic_imei_threshold: 0.2,
          historic_imsi_threshold: 0.9,
          historic_msisdn_threshold: 0.9,
          leading_zero_suspect_limit: 0.05,

          //Step 3
          lookback_days: 180,
          restrict_exceptions_list_to_blacklisted_imeis: false,
          generate_check_digit: false,

          output_invalid_imeis: true,
          include_barred_imeis_in_exceptions_list: false,
          notify_imsi_change: false,
          GSMA_import_size_variation_absolute: 100,
          GSMA_import_size_variation_percent: 0.5,
          pairing_import_size_variation_absolute: 1000,
          pairing_import_size_variation_percent: 0.95,
          stolen_import_size_variation_absolute: -1,
          stolen_import_size_variation_percent: 0.75,
          registration_import_size_variation_absolute: -1,
          registration_import_size_variation_percent: 0.75,
          golden_import_size_variation_absolute: -1,
          golden_import_size_variation_percent: 0.75,
          barred_import_size_variation_absolute: -1,
          barred_import_size_variation_percent: 0.75,
          BarredTAC_import_size_variation_absolute: -1,
          BarredTAC_import_size_variation_percent: 0.75,
          subscribers_import_size_variation_absolute: 1000,
          subscribers_import_size_variation_percent: 0.95,
          association_import_size_variation_absolute: -1,
          association_import_size_variation_percent: 0.75,

          //Step 4
          amnesty_enabled: false,
          evaluation_period_end_date: "",
          amnesty_period_end_date: "",
          months_retention: 6,
          statsd_port: 8125,
          blacklist_retention: false,
          max_db_connections: 8,
          max_local_cpus: 10,
          blacklist_violations_grace_period_days: 2,
          redis_hostname: "redis",
          redis_port: 8125,
          redis_password: "",
          db: 0,
          cache_timeout: 300,

          //step 5
          perform_prevalidation: false,
          catalog: [{ file_type: "", paths: "", schema_filename: "" }],

          //step 6
          activate_whitelist: false,
          restrict_whitelist: false,
          kafka_hostname: "",
          kafka_port: "",
          security_protocol: [],
          kafka_topic: "",
          client_certificate: "",
          skip_tls_verifications: "",
          caroot_certificate: "",
          client_key: "",
          broker_operator: [{ id: "", name: "", topic: "" }],

          //Step 7
          conditions: [
            {
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
            },
          ],
        },
  /**
   * Formik validations
   * @param values
   */
  validate: (values, props) => {
    let error = {};

    // //Step 1 Validation
    if (!values.databasename) {
      error.databasename = "This field is required.";
    }
    if (!values.host) {
      error.host = "This field is required.";
    } else if (
      !/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/.test(
        values.host
      )
    ) {
      error.host = "The host is incorrect.";
    }

    if (!values.port) {
      error.port = "This field is required.";
    } else if (values.port.toString().includes("-")) {
      error.port = "The port number must be positive number.";
    } else if (isNaN(values.port)) {
      error.port = "Must be a number";
    }
    if (!values.user) {
      error.user = "This field is required.";
    }
    if (values.regionname.length <= 0) {
      error.regionname = "This field is required.";
    }

    if (values.countryCode.length <= 0) {
      error.countryCode = "This field is required.";
    } else if (
      Object.keys(values.regionname).length > 0 &&
      Object.keys(values.countryCode).length > 0
    ) {
      if (
        CountryNameCode(values.regionname.value, values.countryCode.value) ===
        undefined
      ) {
        error.countryCode = "The country code and region name are not matched.";
      }
    }
    let region_operator = [];

    if (values.region_operator.length > 0) {
      for (let i = 0; i < values.region_operator.length; i++) {
        if (typeof error.region_operator === "undefined") {
          error.region_operator = [];
        }
        if (typeof error.region_operator[i] === "undefined") {
          error.region_operator[i] = {};
        }

        if (!values.region_operator[i].id) {
          error.region_operator[i].id = "This field is required.";
        }

        if (!values.region_operator[i].name) {
          error.region_operator[i].name = "This field is required.";
        }
        if (!values.region_operator[i].mcc) {
          error.region_operator[i].mcc = "This field is required.";
        } else if (values.region_operator[i].mcc.includes("-")) {
          error.region_operator[i].mcc =
            "The MCC number must be a positive number.";
        } else if (isNaN(values.region_operator[i].mcc)) {
          error.region_operator[i].mcc = "Must be a number.";
        }
        if (!values.region_operator[i].mnc) {
          error.region_operator[i].mnc = "This field is required.";
        } else if (values.region_operator[i].mnc.includes("-")) {
          error.region_operator[i].mnc =
            "The MNC number must be a positive number.";
        } else if (isNaN(values.region_operator[i].mnc)) {
          error.region_operator[i].mnc = "Must be a number.";
        }

        if (values.region_operator[i].id.length > 0) {
          region_operator.push(values.region_operator[i].id);
        }

        if (Object.keys(error.region_operator[i]).length === 0) {
          delete error.region_operator[i];
        }
        if (Object.keys(error.region_operator).length === 0) {
          delete error.region_operator;
        }
      }
    }
    // error.step1Valid = error === {} ? false : true
    // //Step 2
    if (!values.file_rotation_max_bytes) {
      error.file_rotation_max_bytes = "This field is required.";
    }
    if (!values.file_rotation_backup_count) {
      error.file_rotation_backup_count = "This field is required.";
    }
    if (values.null_imei_threshold === "") {
      error.null_imei_threshold = "This field is required.";
    } else if (
      values.null_imei_threshold < 0 ||
      values.null_imei_threshold > 1
    ) {
      error.null_imei_threshold = "Must be in between 0 - 1.";
    }
    if (values.null_imsi_threshold === "") {
      error.null_imsi_threshold = "This field is required.";
    } else if (
      values.null_imsi_threshold < 0 ||
      values.null_imsi_threshold > 1
    ) {
      error.null_imsi_threshold = "Must be in between 0 - 1.";
    }
    if (values.null_msisdn_threshold === "") {
      error.null_msisdn_threshold = "This field is required";
    } else if (
      values.null_msisdn_threshold < 0 ||
      values.null_msisdn_threshold > 1
    ) {
      error.null_msisdn_threshold = "Must be in between 0 - 1.";
    }
    if (values.null_rat_threshold === "") {
      error.null_rat_threshold = "This field is required.";
    } else if (values.null_rat_threshold < 0 || values.null_rat_threshold > 1) {
      error.null_rat_threshold = "Must be in between 0 - 1";
    }
    if (values.null_threshold === "") {
      error.null_threshold = "This field is required";
    } else if (values.null_threshold < 0 || values.null_threshold > 1) {
      error.null_threshold = "Must be in between 0 - 1.";
    }
    if (values.unclean_imei_threshold === "") {
      error.unclean_imei_threshold = "This field is required.";
    } else if (
      values.unclean_imei_threshold < 0 ||
      values.unclean_imei_threshold > 1
    ) {
      error.unclean_imei_threshold = "Must be in between 0 - 1.";
    }
    if (values.unclean_imsi_threshold === "") {
      error.unclean_imsi_threshold = "This field is required.";
    } else if (
      values.unclean_imsi_threshold < 0 ||
      values.unclean_imsi_threshold > 1
    ) {
      error.unclean_imsi_threshold = "Must be in between 0 - 1.";
    }
    if (values.unclean_threshold === "") {
      error.unclean_threshold = "This field is required.";
    } else if (values.unclean_threshold < 0 || values.unclean_threshold > 1) {
      error.unclean_threshold = "Must be in between 0 - 1.";
    }
    if (values.out_of_region_imsi_threshold === "") {
      error.out_of_region_imsi_threshold = "This field is required.";
    } else if (
      values.out_of_region_imsi_threshold < 0 ||
      values.out_of_region_imsi_threshold > 1
    ) {
      error.out_of_region_imsi_threshold = "Must be in between 0.1 - 1.";
    }
    if (values.out_of_region_msisdn_threshold === "") {
      error.out_of_region_msisdn_threshold = "This field is required.";
    } else if (
      values.out_of_region_msisdn_threshold < 0 ||
      values.out_of_region_msisdn_threshold > 1
    ) {
      error.out_of_region_msisdn_threshold = "Must be in between 0 - 1";
    }
    if (values.out_of_region_threshold === "") {
      error.out_of_region_threshold = "This field is required.";
    } else if (
      values.out_of_region_threshold < 0 ||
      values.out_of_region_threshold > 1
    ) {
      error.out_of_region_threshold = "Must be in between 0 - 1";
    }
    if (values.non_home_network_threshold === "") {
      error.non_home_network_threshold = "This field is required.";
    } else if (
      values.non_home_network_threshold < 0 ||
      values.non_home_network_threshold > 1
    ) {
      error.non_home_network_threshold = "Must be in between 0 - 1";
    }
    if (values.historic_imei_threshold === "") {
      error.historic_imei_threshold = "This field is required.";
    } else if (
      values.historic_imei_threshold < 0 ||
      values.historic_imei_threshold > 1
    ) {
      error.historic_imei_threshold = "Must be in between 0 - 1";
    }
    if (values.historic_imsi_threshold === "") {
      error.historic_imsi_threshold = "This field is required.";
    } else if (
      values.historic_imsi_threshold < 0 ||
      values.historic_imsi_threshold > 1
    ) {
      error.historic_imsi_threshold = "Must be in between 0 - 1";
    }
    if (values.historic_msisdn_threshold === "") {
      error.historic_msisdn_threshold = "This field is required.";
    } else if (
      values.historic_msisdn_threshold < 0 ||
      values.historic_msisdn_threshold > 1
    ) {
      error.historic_msisdn_threshold = "Must be in between 0 - 1";
    }
    if (values.leading_zero_suspect_limit === "") {
      error.leading_zero_suspect_limit = "This field is required.";
    } else if (
      values.leading_zero_suspect_limit < 0 ||
      values.leading_zero_suspect_limit > 1
    ) {
      error.leading_zero_suspect_limit = "Must be in between 0 - 1.";
    }
    // error.step2Valid = error === {} ? true : false

    //step 3
    if (!values.lookback_days) {
      error.lookback_days = "This field is required";
    } else if (values.lookback_days < 0) {
      error.lookback_days = "Lookback days must be a positive number.";
    }
    if (!values.GSMA_import_size_variation_absolute) {
      error.GSMA_import_size_variation_absolute = "This field is required.";
    }
    if (values.GSMA_import_size_variation_percent === "") {
      error.GSMA_import_size_variation_percent = "This field is required.";
    } else if (values.GSMA_import_size_variation_percent < 0) {
      error.GSMA_import_size_variation_percent = "Must be a positive number.";
    } else if (isNaN(values.GSMA_import_size_variation_percent)) {
      error.GSMA_import_size_variation_percent = "Must be number.";
    }

    if (!values.pairing_import_size_variation_absolute) {
      error.pairing_import_size_variation_absolute = "This field is required.";
    }
    if (!values.pairing_import_size_variation_percent) {
      error.pairing_import_size_variation_percent = "This field is required.";
    }

    if (!values.stolen_import_size_variation_absolute) {
      error.stolen_import_size_variation_absolute = "This field is required.";
    }
    if (!values.stolen_import_size_variation_percent) {
      error.stolen_import_size_variation_percent = "This field is required.";
    }

    if (!values.registration_import_size_variation_absolute) {
      error.registration_import_size_variation_absolute =
        "This field is required.";
    }
    if (!values.registration_import_size_variation_percent) {
      error.registration_import_size_variation_percent =
        "This field is required.";
    }

    if (!values.golden_import_size_variation_absolute) {
      error.golden_import_size_variation_absolute = "This field is required.";
    }
    if (!values.golden_import_size_variation_percent) {
      error.golden_import_size_variation_percent = "This field is required.";
    }

    if (!values.barred_import_size_variation_absolute) {
      error.barred_import_size_variation_absolute = "This field is required.";
    }
    if (!values.barred_import_size_variation_percent) {
      error.barred_import_size_variation_percent = "This field is required.";
    }
    if (!values.BarredTAC_import_size_variation_absolute) {
      error.BarredTAC_import_size_variation_absolute =
        "This field is required.";
    }
    if (!values.BarredTAC_import_size_variation_percent) {
      error.BarredTAC_import_size_variation_percent = "This field is required.";
    }
    if (!values.subscribers_import_size_variation_absolute) {
      error.subscribers_import_size_variation_absolute =
        "This field is required.";
    }
    if (!values.subscribers_import_size_variation_percent) {
      error.subscribers_import_size_variation_percent =
        "This field is required.";
    }
    if (!values.association_import_size_variation_absolute) {
      error.association_import_size_variation_absolute =
        "This field is required.";
    }
    if (!values.association_import_size_variation_percent) {
      error.association_import_size_variation_percent =
        "This field is required.";
    }
    if (values.months_retention < 0) {
      error.months_retention = "This field is required.";
    }
    if (!values.redis_port) {
      error.redis_port = "This field is required.";
    } else if (values.redis_port.toString().includes("-")) {
      error.redis_port = "The Redis port number must be positive number.";
    } else if (isNaN(values.redis_port)) {
      error.redis_port = "Must be a number";
    }
    if (!values.redis_hostname) {
      error.redis_hostname = "This field is required";
    } else if (
      !/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/.test(
        values.redis_hostname
      )
    ) {
      error.redis_hostname = "The Redis host is incorrect.";
    }
    if (values.max_db_connections < 0) {
      error.max_db_connections = "This field is required.";
    }
    if (!values.blacklist_violations_grace_period_days) {
      error.blacklist_violations_grace_period_days = "This field is required.";
    }
    if (values.amnesty_enabled === true) {
      if (!values.evaluation_period_end_date) {
        error.evaluation_period_end_date = "This field is required.";
      }
      if (!values.amnesty_period_end_date) {
        error.amnesty_period_end_date = "This field is required.";
      } else if (
        values.amnesty_period_end_date <= values.evaluation_period_end_date
      ) {
        error.amnesty_period_end_date =
          "End of amnesty period must be greater than the evaluation period end date.";
      }
    }
    // error.step3Valid = error === {} ? true : false
    // catalog: [{ file_type: "", paths: "", schema_filename: "" }],
    let catalog = [];

    if (values.catalog.length > 0) {
      for (let i = 0; i < values.catalog.length; i++) {
        if (typeof error.catalog === "undefined") {
          error.catalog = [];
        }
        if (typeof error.catalog[i] === "undefined") {
          error.catalog[i] = {};
        }
        if (values.catalog[i].file_type.value) {
          if (!values.catalog[i].paths) {
            error.catalog[i].paths = "This field is required.";
          }

          if (!values.catalog[i].schema_filename) {
            error.catalog[i].schema_filename = "This field is required.";
          }

          if (values.catalog[i].paths.length > 0) {
            catalog.push(values.catalog[i].paths);
          }
        }
        if (Object.keys(error.catalog[i]).length === 0) {
          delete error.catalog[i];
        }
        if (Object.keys(error.catalog).length === 0) {
          delete error.catalog;
        }
      }
    }
    //step 6
    if (values.activate_whitelist === true) {
      if (!values.kafka_hostname) {
        error.kafka_hostname = "This field is required.";
      } else if (
        !/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/.test(
          values.kafka_hostname
        )
      ) {
        error.kafka_hostname = "The kafka host is incorrect.";
      }
      if (!values.kafka_port) {
        error.kafka_port = "This field is required.";
      } else if (
        typeof values.kafka_port === String
          ? values.kafka_port.includes("-")
          : false
      ) {
        error.kafka_port = "The kafka port number must be positive number.";
      } else if (isNaN(values.kafka_port)) {
        error.kafka_port = "Must be a number";
      }
      if (!values.kafka_topic) {
        error.kafka_topic = "This field is required.";
      }
      if (values.security_protocol.length <= 0) {
        error.security_protocol = "Security Protocol must be greater than 0.";
      }
      //Inside SSL Condition:
      if (values.activate_whitelist === true) {
        if (values.security_protocol.value === "ssl") {
          if (!values.client_certificate) {
            error.client_certificate = "This field is required.";
          }
          if (!values.caroot_certificate) {
            error.caroot_certificate = "This field is required.";
          }
          if (!values.client_key) {
            error.client_key = "This field is required.";
          }
        }
      }

      let broker_operator = [];
      if (values.broker_operator.length > 0) {
        for (let i = 0; i < values.broker_operator.length; i++) {
          if (typeof error.broker_operator === "undefined") {
            error.broker_operator = [];
          }
          if (typeof error.broker_operator[i] === "undefined") {
            error.broker_operator[i] = {};
          }

          if (!values.broker_operator[i].id) {
            error.broker_operator[i].id = "This field is required.";
          }

          if (!values.broker_operator[i].name) {
            error.broker_operator[i].name = "This field is required.";
          }
          if (!values.broker_operator[i].topic) {
            error.broker_operator[i].topic = "This field is required.";
          }

          if (values.broker_operator[i].id.length > 0) {
            broker_operator.push(values.broker_operator[i].id);
          }

          if (Object.keys(error.broker_operator[i]).length === 0) {
            delete error.broker_operator[i];
          }
          if (Object.keys(error.broker_operator).length === 0) {
            delete error.broker_operator;
          }
        }
      }
    }
    //step7
    if (props.step === 7) {
      if (values.conditions.length > 0) {
        for (let i = 0; i < values.conditions.length; i++) {
          if (typeof error.conditions === "undefined") {
            error.conditions = [];
          }
          if (error.conditions[i] === undefined) {
            error.conditions[i] = {};
          }
          if (!values.conditions[i].label) {
            error.conditions[i].label = "This field is required";
          }
          if (values.conditions[i].grace_period_days === "") {
            error.conditions[i].grace_period_days = "This field is required";
          } else if (
            values.conditions[i].grace_period_days.toString().includes("-")
          ) {
            error.conditions[i].grace_period_days =
              "The grace period days must be positive number.";
          }
          if (!values.conditions[i].max_allowed_matching_ratio) {
            error.conditions[i].max_allowed_matching_ratio =
              "This field is required";
          }
          if (!values.conditions[i].reason) {
            error.conditions[i].reason = "This field is required";
          }
          // if (values.conditions[i].length > 0) {
          //   error.conditions[i] = {};
          // }
          for (let j = 0; j < values.conditions[i].dimension.length; j++) {
            if (
              typeof error.conditions !== "undefined" &&
              error.conditions[i] !== undefined
            ) {
              if (typeof error.conditions[i].dimension === "undefined") {
                error.conditions[i].dimension = [];
              }

              if (error.conditions[i].dimension[j] === undefined) {
                error.conditions[i].dimension[j] = {};
              }

              if (
                Object.keys(values.conditions[i].dimension[j].module).length ===
                0
              ) {
                error.conditions[i].dimension[j].module =
                  "This field is required";
              }

              if (
                values.conditions[i].dimension[j].module.value ===
                  "daily_avg_uid" ||
                values.conditions[i].dimension[j].module.value ===
                  "duplicate_daily_avg" ||
                values.conditions[i].dimension[j].module.value ===
                  "duplicate_threshold"
              ) {
                if (!values.conditions[i].dimension[j].threshold) {
                  error.conditions[i].dimension[j].threshold =
                    "This field is required";
                }
                if (
                  values.conditions[i].dimension[j].period_days === "" &&
                  values.conditions[i].dimension[j].period_months === ""
                ) {
                  error.conditions[i].dimension[j].period_days =
                    "This field is required";
                  error.conditions[i].dimension[j].period_months =
                    "This field is required";
                } else if (
                  values.conditions[i].dimension[j].period_days
                    .toString()
                    .includes("-")
                ) {
                  error.conditions[i].dimension[j].period_days =
                    "The period days must be positive number.";
                }
                if (
                  values.conditions[i].dimension[j].period_months
                    .toString()
                    .includes("-")
                ) {
                  error.conditions[i].dimension[j].period_months =
                    "The period months must be positive number.";
                } else if (
                  values.conditions[i].dimension[j].period_months &&
                  values.conditions[i].dimension[j].period_days
                ) {
                  error.conditions[i].dimension[j].period_months =
                    "One of the field is Required.";
                  error.conditions[i].dimension[j].period_days =
                    "One of the field is Required.";
                }
              }
              if (
                values.conditions[i].dimension[j].module.value ===
                  "daily_avg_uid" ||
                values.conditions[i].dimension[j].module.value ===
                  "duplicate_daily_avg"
              ) {
                if (values.conditions[i].dimension[j].min_seen_days === "") {
                  error.conditions[i].dimension[j].min_seen_days =
                    "This field is required";
                } else if (
                  values.conditions[i].dimension[j].min_seen_days
                    .toString()
                    .includes("-")
                ) {
                  error.conditions[i].dimension[j].min_seen_days =
                    "The min seen days must be positive number.";
                }
              }
              //GSMA Validation
              if (
                values.conditions[i].dimension[j].module.value ===
                "gsma_not_found"
              ) {
                error.conditions[i].dimension[j].rbi_delays = {};
                if (
                  values.conditions[i].dimension[j].rbi_delays["rbi_00"] === ""
                ) {
                  error.conditions[i].dimension[j].rbi_delays["rbi_00"] =
                    "This field is required";
                }
                if (
                  values.conditions[i].dimension[j].rbi_delays["rbi_01"] === ""
                ) {
                  error.conditions[i].dimension[j].rbi_delays["rbi_01"] =
                    "This field is required";
                }
                if (
                  values.conditions[i].dimension[j].rbi_delays["rbi_35"] === ""
                ) {
                  error.conditions[i].dimension[j].rbi_delays["rbi_35"] =
                    "This field is required";
                }
                if (
                  values.conditions[i].dimension[j].rbi_delays["rbi_86"] === ""
                ) {
                  error.conditions[i].dimension[j].rbi_delays["rbi_86"] =
                    "This field is required";
                }
                if (
                  values.conditions[i].dimension[j].rbi_delays["rbi_91"] === ""
                ) {
                  error.conditions[i].dimension[j].rbi_delays["rbi_91"] =
                    "This field is required";
                }
                if (
                  values.conditions[i].dimension[j].rbi_delays["rbi_99"] === ""
                ) {
                  error.conditions[i].dimension[j].rbi_delays["rbi_99"] =
                    "This field is required";
                }
              }
              if (
                values.conditions[i].dimension[j].module.value ===
                "transient_imei"
              ) {
                if (!values.conditions[i].dimension[j].period) {
                  error.conditions[i].dimension[j].period =
                    "This field is required";
                }
                if (!values.conditions[i].dimension[j].num_msisdns) {
                  error.conditions[i].dimension[j].num_msisdns =
                    "This field is required";
                }
              }
              if (
                values.conditions[i].dimension[j].module.value ===
                  "used_by_dirbs_subscriber" ||
                values.conditions[i].dimension[j].module.value ===
                  "used_by_international_roamer" ||
                values.conditions[i].dimension[j].module.value ===
                  "used_by_local_non_dirbs_roamer"
              ) {
                if (values.conditions[i].dimension[j].lookback_days === "") {
                  error.conditions[i].dimension[j].lookback_days =
                    "This field is required";
                } else if (
                  values.conditions[i].dimension[j].lookback_days
                    .toString()
                    .includes("-")
                ) {
                  error.conditions[i].dimension[j].lookback_days =
                    "The look backdays must be positive number.";
                }
              }
              if (
                values.conditions[i].dimension[j].module.value ===
                "exists_in_monitoring_list"
              ) {
                if (values.conditions[i].dimension[j].monitored_days === "") {
                  error.conditions[i].dimension[j].monitored_days =
                    "This field is required";
                } else if (
                  values.conditions[i].dimension[j].monitored_days
                    .toString()
                    .includes("-")
                ) {
                  error.conditions[i].dimension[j].monitored_days =
                    "The monitored days must be positive number.";
                }
              }
              if (
                error.conditions[i].dimension[j].rbi_delays !== undefined &&
                Object.keys(error.conditions[i].dimension[j].rbi_delays)
                  .length === 0
              ) {
                delete error.conditions[i].dimension[j].rbi_delays;
              }
              if (Object.keys(error.conditions[i].dimension[j]).length === 0) {
                delete error.conditions[i].dimension[j];
              }
              if (error.conditions[i].dimension.length === 0) {
                delete error.conditions[i].dimension;
              }
              if (Object.keys(error.conditions[i]).length === 0) {
                delete error.conditions[i];
              }
              if (error.conditions.length === 0) {
                delete error.conditions;
              }

              // if (Object.keys(error.conditions[i].dimension[j]).length === 0) {
              //   if (j === 0) {
              //     error.conditions[i].dimension = [];
              //   } else {
              //     error.conditions[i].dimension.splice(j, 1);
              //     // delete error.conditions[i].dimension[j];
              //   }
              // }
              // if (error.conditions[i].dimension.length === 0) {
              //   delete error.conditions[i].dimension;
              // }
              // if (Object.keys(error.conditions[i]).length === 0) {
              //   if (i === 0) {
              //     error.conditions = [];
              //   } else {
              //     error.conditions.splice(i, 1);
              //     // delete error.conditions[i];
              //   }
              // }
              // if (error.conditions.length === 0) {
              //   delete error.conditions;
              // }
            }
          }
        }
      }
    }
    return error;
  },
  /**
   * Formik submit function
   * @param values
   * @param bag
   */

  handleSubmit: (values, bag) => {
    bag.props.recivedFormData(setDataForFile(values));
    bag.resetForm();
  },
  displayName: "MultiStepForm", // helps with React DevTools
})(MultiStepForm);
//prepareAPIRequest set server data
function setDataForFile(values) {
  let requestObj = {
    postgresql: {
      database: values.databasename,
      host: values.host,
      port: parseInt(values.port),
      user: values.user,
    },
    region: {
      name: values.regionname.value,
      import_msisdn_data: values.msisdnData,
      import_rat_data: values.rad,
      country_codes: [values.countryCode.value],
      exempted_device_types: values.exemptedDevice ? values.exemptedDevice : [],
      operators: values.region_operator.map((item) => ({
        id: item["id"],
        name: item["name"],
        mcc_mnc_pairs: [
          {
            mcc: item["mcc"],
            mnc: item["mnc"],
          },
        ],
      })),
    },
    //step 2
    logging: {
      level: values.level.value,
      format: values.format.replace("%", ""),
      show_statsd_messages: values.show_statsd_messages,
      show_werkzeug_messages: values.show_werkzeug_messages,
      show_sql_messages: values.show_sql_messages,
      log_directory: values.log_directory,
      file_prefix: values.file_prefix === "null" ? null : values.file_prefix,
      file_rotation_max_bytes: values.file_rotation_max_bytes,
      file_rotation_backup_count: values.file_rotation_backup_count,
    },
    operator_threshold: {
      null_imei_threshold: values.null_imei_threshold,
      null_imsi_threshold: values.null_imsi_threshold,
      null_msisdn_threshold: values.null_msisdn_threshold,
      null_rat_threshold: values.null_rat_threshold,
      null_threshold: values.null_threshold,
      unclean_imei_threshold: values.unclean_imei_threshold,
      unclean_imsi_threshold: values.unclean_imsi_threshold,
      unclean_threshold: values.unclean_threshold,
      out_of_region_imsi_threshold: values.out_of_region_imsi_threshold,
      out_of_region_msisdn_threshold: values.out_of_region_msisdn_threshold,
      out_of_region_threshold: values.out_of_region_threshold,
      non_home_network_threshold: values.non_home_network_threshold,
      historic_imei_threshold: values.historic_imei_threshold,
      historic_imsi_threshold: values.historic_imsi_threshold,
      historic_msisdn_threshold: values.historic_msisdn_threshold,
      leading_zero_suspect_limit: values.leading_zero_suspect_limit,
    },

    //step 3
    list_generation: {
      lookback_days: values.lookback_days,
      restrict_exceptions_list_to_blacklisted_imeis:
        values.restrict_exceptions_list_to_blacklisted_imeis,
      generate_check_digit: values.generate_check_digit,
      output_invalid_imeis: values.output_invalid_imeis,
      include_barred_imeis_in_exceptions_list:
        values.include_barred_imeis_in_exceptions_list,
      notify_imsi_change: values.notify_imsi_change,
    },
    gsma_threshold: {
      import_size_variation_absolute:
        values.GSMA_import_size_variation_absolute,

      import_size_variation_percent: parseInt(
        values.GSMA_import_size_variation_percent
      ),
    },

    pairing_list_threshold: {
      import_size_variation_absolute:
        values.pairing_import_size_variation_absolute,

      import_size_variation_percent:
        values.pairing_import_size_variation_percent,
    },

    stolen_list_threshold: {
      import_size_variation_absolute:
        values.stolen_import_size_variation_absolute,

      import_size_variation_percent:
        values.stolen_import_size_variation_percent,
    },
    registration_list_threshold: {
      import_size_variation_absolute:
        values.registration_import_size_variation_absolute,
      import_size_variation_percent:
        values.registration_import_size_variation_percent,
    },
    golden_list_threshold: {
      import_size_variation_absolute:
        values.golden_import_size_variation_absolute,
      import_size_variation_percent:
        values.golden_import_size_variation_percent,
    },

    barred_list_threshold: {
      import_size_variation_absolute:
        values.barred_import_size_variation_absolute,
      import_size_variation_percent:
        values.barred_import_size_variation_percent,
    },
    barred_tac_list_threshold: {
      import_size_variation_absolute:
        values.BarredTAC_import_size_variation_absolute,

      import_size_variation_percent:
        values.BarredTAC_import_size_variation_percent,
    },
    subscribers_list_threshold: {
      import_size_variation_absolute:
        values.subscribers_import_size_variation_absolute,

      import_size_variation_percent:
        values.subscribers_import_size_variation_percent,
    },
    association_list_threshold: {
      import_size_variation_absolute:
        values.association_import_size_variation_absolute,
      import_size_variation_percent:
        values.association_import_size_variation_percent,
    },
    //step 4
    amnesty: {
      amnesty_enabled: values.amnesty_enabled,
    },
    data_retention: {
      months_retention: values.months_retention,
      blacklist_retention: values.blacklist_retention,
    },
    statsd: {
      port: parseInt(values.statsd_port),
    },
    multiprocessing: {
      max_local_cpus: values.max_local_cpus,
      max_db_connections: values.max_db_connections,
    },
    report_generation: {
      blacklist_violations_grace_period_days:
        values.blacklist_violations_grace_period_days,
    },
    redis: {
      hostname: values.redis_hostname,
      port: parseInt(values.redis_port),
      db: values.db,
      cache_timeout: values.cache_timeout,
    },
    //step 5
    catalog: {
      prospectors: values.catalog.map((item, i) => {
        if (item["file_type"].value) {
          return {
            file_type: item["file_type"].value,
            paths: [item.paths],
            schema_filename: item["schema_filename"],
          };
        }
      }),
      perform_prevalidation: values.perform_prevalidation,
    },
    operational: {
      activate_whitelist: values.activate_whitelist,
      restrict_whitelist: values.restrict_whitelist,
    },
  };
  if (values.redis_password) {
    requestObj.redis.password = values.redis_password;
  }
  // step 6
  if (requestObj.catalog.prospectors[0] === undefined) {
    delete requestObj.catalog.prospectors;
  }
  if (values.activate_whitelist === true) {
    requestObj.broker = {
      kafka: {
        hostname: values.kafka_hostname,
        port: parseInt(values.kafka_port),
        topic: values["kafka_topic"],
        security_protocol: values.security_protocol.value,
      },

      operators: values.broker_operator.map((item) => ({
        id: item["id"],
        name: item["name"],
        topic: item["topic"],
      })),
    };
  }
  if (values.amnesty_enabled === true) {
    requestObj.amnesty.evaluation_period_end_date = parseInt(
      moment(values.evaluation_period_end_date).format("YYYYMMDD")
    );
    requestObj.amnesty.amnesty_period_end_date = parseInt(
      moment(values.amnesty_period_end_date).format("YYYYMMDD")
    );
  }
  if (values.activate_whitelist === true) {
    if (values.security_protocol.value === "ssl") {
      requestObj.broker.kafka.client_key = values.client_key;
      requestObj.broker.kafka.caroot_certificate = values.caroot_certificate;
      requestObj.broker.kafka.skip_tls_verifications =
        values.skip_tls_verifications;
      requestObj.broker.kafka.client_certificate = values.client_certificate;
    }
  }
  if (values.conditions) {
    requestObj.conditions = values.conditions.map((item) => ({
      label: item["label"],
      grace_period_days: item.grace_period_days,
      blocking: item.blocking,
      reason: item.reason,
      max_allowed_matching_ratio: parseInt(item["max_allowed_matching_ratio"]),
      dimensions: item.dimension.map((items) => {
        if (items.module.value === "daily_avg_uid") {
          if (items.period_months) {
            return {
              module: items.module.value,
              parameters: {
                threshold: items.threshold,
                period_months: items.period_months,
                min_seen_days: items.min_seen_days,
              },
            };
          } else {
            return {
              module: items.module.value,
              parameters: {
                threshold: items.threshold,
                period_days: items.period_days,
                min_seen_days: items.min_seen_days,
              },
            };
          }
        }
        if (items.module.value === "duplicate_daily_avg") {
          if (items.period_months) {
            return {
              module: items.module.value,
              parameters: {
                threshold: items.threshold,
                period_months: items.period_months,
                min_seen_days: items.min_seen_days,
                use_msisdn: items.use_msisdn,
              },
            };
          } else {
            return {
              module: items.module.value,
              parameters: {
                threshold: items.threshold,
                period_days: items.period_days,
                min_seen_days: items.min_seen_days,
                use_msisdn: items.use_msisdn,
              },
            };
          }
        }
        if (items.module.value === "duplicate_threshold") {
          if (items.period_months) {
            return {
              module: items.module.value,
              parameters: {
                threshold: items.threshold,
                period_months: items.period_months,
                use_msisdn: items.use_msisdn,
              },
            };
          } else {
            return {
              module: items.module.value,
              parameters: {
                threshold: items.threshold,
                period_days: items.period_days,
                use_msisdn: items.use_msisdn,
              },
            };
          }
        }
        if (items.module.value === "transient_imei") {
          return {
            module: items.module.value,
            parameters: {
              period: items.period,
              num_msisdns: items.num_msisdns,
            },
          };
        }
        if (
          items.module.value === "used_by_dirbs_subscriber" ||
          items.module.value === "used_by_local_non_dirbs_roamer" ||
          items.module.value === "used_by_international_roamer"
        ) {
          return {
            module: items.module.value,
            parameters: {
              lookback_days: items.lookback_days,
            },
          };
        }
        if (items.module.value === "exists_in_monitoring_list") {
          return {
            module: items.module.value,
            parameters: {
              monitored_days: items.monitored_days,
            },
          };
        }
        if (items.module.value === "gsma_not_found") {
          return {
            module: items.module.value,
            parameters: {
              ignore_rbi_delays: items.rbi_delays["ignore_rbi_delays"],
              per_rbi_delays: {
                "00": items.rbi_delays["rbi_00"],
                "01": items.rbi_delays["rbi_01"],
                "35": items.rbi_delays["rbi_35"],
                "86": items.rbi_delays["rbi_86"],
                "91": items.rbi_delays["rbi_91"],
                "99": items.rbi_delays["rbi_99"],
              },
            },
          };
        }
        if (
          items.module.value === "exists_in_barred_list" ||
          items.module.value === "inconsistent_rat" ||
          items.module.value === "is_barred_tac" ||
          items.module.value === "is_test_tac" ||
          items.module.value === "malformed_imei" ||
          items.module.value === "not_on_association_list" ||
          items.module.value === "not_on_registration_list" ||
          items.module.value === "stolen_list"
        ) {
          return {
            module: items.module.value,
          };
        }
      }),
    }));
  }
  return requestObj;
}
class CoreConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      fileType: "newFile",
      data: {},
      filename: "",
      extensionError: "This field is required",
      error: null,
    };
  }
  //Receive Form data & generate File
  recivedFormData = (data) => {
    const element = document.createElement("a");
    let configString = YAML.stringify(data);
    const tempString = configString.split("format")[1];
    const startingIndex = tempString.indexOf(":") + 2;
    const endingIndex = tempString.indexOf("\n");
    const tempFormat = tempString.substring(startingIndex, endingIndex);
    const resultFormat = `'%${tempFormat}'`;
    configString = configString.replace(tempFormat, resultFormat);
    const file = new Blob([configString], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "config.yml";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    this.setState({ step: 0, fileType: "newFile", error: "" });
  };
  handleFileTypeChange = (e) => {
    this.setState({
      fileType: e.currentTarget.value,
      extensionError: "This field is required",
      data: {},
    });
  };
  handleNextPage = () => {
    this.setState({
      step: this.state.step + 1,
    });
  };
  handleBackPage = () => {
    this.setState({
      step: this.state.step - 1,
    });
  };
  //Check the errors in step and then setState
  stepError = (errorStep) => {
    if (
      errorStep.region_operator ||
      errorStep.databasename ||
      errorStep.port ||
      errorStep.host ||
      errorStep.user ||
      errorStep.regionname ||
      errorStep.countryCode
    ) {
      this.setState({ step: 1, error: 1 });
    } else if (
      errorStep.file_rotation_max_bytes ||
      errorStep.file_rotation_backup_count ||
      errorStep.null_imei_threshold ||
      errorStep.null_imsi_threshold ||
      errorStep.null_msisdn_threshold ||
      errorStep.null_rat_threshold ||
      errorStep.null_threshold ||
      errorStep.unclean_imei_threshold ||
      errorStep.unclean_imsi_threshold ||
      errorStep.unclean_threshold ||
      errorStep.out_of_region_imsi_threshold ||
      errorStep.out_of_region_msisdn_threshold ||
      errorStep.out_of_region_threshold ||
      errorStep.non_home_network_threshold ||
      errorStep.historic_imei_threshold ||
      errorStep.historic_imsi_threshold ||
      errorStep.historic_msisdn_threshold ||
      errorStep.leading_zero_suspect_limit
    ) {
      this.setState({ step: 2, error: 2 });
    } else if (
      errorStep.lookback_days ||
      errorStep.GSMA_import_size_variation_absolute ||
      errorStep.GSMA_import_size_variation_percent ||
      errorStep.pairing_import_size_variation_absolute ||
      errorStep.pairing_import_size_variation_percent ||
      errorStep.stolen_import_size_variation_absolute ||
      errorStep.stolen_import_size_variation_percent ||
      errorStep.registration_import_size_variation_absolute ||
      errorStep.registration_import_size_variation_percent ||
      errorStep.golden_import_size_variation_absolute ||
      errorStep.golden_import_size_variation_percent ||
      errorStep.barred_import_size_variation_absolute ||
      errorStep.barred_import_size_variation_percent ||
      errorStep.BarredTAC_import_size_variation_absolute ||
      errorStep.BarredTAC_import_size_variation_percent ||
      errorStep.subscribers_import_size_variation_absolute ||
      errorStep.subscribers_import_size_variation_percent ||
      errorStep.association_import_size_variation_absolute ||
      errorStep.association_import_size_variation_percent
    ) {
      this.setState({ step: 3, error: 3 });
    } else if (
      errorStep.evaluation_period_end_date ||
      errorStep.amnesty_period_end_date ||
      errorStep.months_retention ||
      errorStep.max_db_connections ||
      errorStep.blacklist_violations_grace_period_days ||
      errorStep.redis_hostname ||
      errorStep.redis_port
    ) {
      this.setState({ step: 4, error: 4 });
    } else if (errorStep.catalog) {
      this.setState({ step: 5, error: 5 });
    } else if (
      errorStep.activate_whitelist ||
      errorStep.restrict_whitelist ||
      errorStep.kafka_hostname ||
      errorStep.kafka_port ||
      errorStep.security_protocol ||
      errorStep.kafka_topic ||
      errorStep.client_certificate ||
      errorStep.skip_tls_verifications ||
      errorStep.caroot_certificate ||
      errorStep.client_key ||
      errorStep.broker_operator
    ) {
      this.setState({ step: 6, error: 6 });
    }
  };
  // Hand = (data) => {
  //     console.log(data);
  //   // this.setState({ step: data });
  // };
  stepPagination = () => {
    const { step, error } = this.state;
    return (
      <>
        <div className="container-fluid">
          <br />
          <br />
          <ul className="list-unstyled multi-steps">
            <li className={step === 0 ? "is-active" : "not-active"} id="step0">
              {step !== 0 && (
                <UncontrolledTooltip placement="top" target="step0">
                  Create New File <br />
                  Edit Existing File <br />
                </UncontrolledTooltip>
              )}
            </li>
            <li
              className={step === 1 ? "is-active" : "not-active"}
              href="#"
              id="step1"
              // style={error === 1 && error !=="" ? {color:"red"}  :{}  }
            >
              {step !== 1 && (
                <UncontrolledTooltip placement="top" target="step1">
                  Postgresql Information <br />
                  Region Information <br />
                </UncontrolledTooltip>
              )}
            </li>
            <li
              className={step === 2 ? "is-active" : "not-active"}
              href="#"
              id="step2"
              // style={error === 2 && error !=="" ? {color:"red"}  :{}  }
            >
              {step !== 2 && (
                <UncontrolledTooltip placement="top" target="step2">
                  Operator Threshold <br />
                  Logging
                  <br />
                </UncontrolledTooltip>
              )}
            </li>
            <li
              className={step === 3 ? "is-active" : "not-active"}
              href="#"
              id="step3"
              // style={error === 3 && error !=="" ? {color:"red"}  :{}  }
            >
              {step !== 3 && (
                <UncontrolledTooltip placement="top" target="step3">
                  List Generation
                  <br />
                  Threshold <br />
                </UncontrolledTooltip>
              )}
            </li>
            <li
              className={step === 4 ? "is-active" : "not-active"}
              href="#"
              id="step4"
              // style={error === 4 && error !=="" ? {color:"red"}  :{}  }
            >
              {step !== 4 && (
                <UncontrolledTooltip placement="top" target="step4">
                  Report Generation <br />
                  Multiprocessing <br />
                  Data Retention <br />
                  Amnesty
                  <br />
                  Redis <br />
                </UncontrolledTooltip>
              )}
            </li>
            <li
              className={step === 5 ? "is-active" : "not-active"}
              href="#"
              id="step5"
              // style={error === 5 && error !=="" ? {color:"red"}  :{}  }
            >
              {step !== 6 && (
                <UncontrolledTooltip placement="top" target="step5">
                  Catalog
                </UncontrolledTooltip>
              )}
            </li>
            <li
              className={step === 6 ? "is-active" : "not-active"}
              href="#"
              id="step6"
              // style={error === 6 && error !=="" ? {color:"red"}  :{}  }
            >
              {step !== 6 && (
                <UncontrolledTooltip placement="top" target="step6">
                  Operational <br />
                  Operators <br />
                  Broker <br />
                </UncontrolledTooltip>
              )}{" "}
            </li>
            <li
              className={step === 7 ? "is-active" : "not-active"}
              href="#"
              id="step7"
              // style={error === 7 && error !=="" ? {color:"red"}  :{}  }
            >
              {step !== 7 && (
                <UncontrolledTooltip placement="top" target="step7">
                  Conditions <br />
                </UncontrolledTooltip>
              )}
            </li>
            <li className={step === 8 ? "is-active" : "not-active"} id="step8">
              {step !== 8 && (
                <UncontrolledTooltip placement="top" target="step8">
                  Finish and Download File <br />
                </UncontrolledTooltip>
              )}
            </li>
          </ul>
        </div>
      </>
    );
  };
  handleRemoveFile = (e) => {
    this.setState({ filename: "", data: {}, extensionError: null });
  };
  setFormValues = (data) => {
    let x = propsToValuesUpdated(this.state.data);
    this.setState({ data: x });
  };
  showFile = (e) => {
    var file = e.target.files[0];
    try {
      let extension = getExtension(e.target.files[0].name);
      if (extension === "yml") {
        this.setState({ filename: e.target.files[0].name });
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const text = e.target.result;
            let x = YAML.parse(text);
            this.setState({ data: x, extensionError: "" }, () => {
              this.setFormValues(x);
            });
          } catch (error) {}
        };
        reader.readAsText(file);
      } else {
        this.setState({
          filename: e.target.files[0].name,
          extensionError: "Invalid file extension, only support 'yml'",
        });
      }
    } catch (error) {}
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={12} md={{ size: 12 }} xs={12} xl={12}>
            {this.stepPagination()}
            <Card className={this.state.step === 0 ? "firstStep" : ""} xl={12}>
              {this.state.step === 0 && (
                <div>
                  <CardBody>
                    <h5> Do you want to :</h5>
                    <Col md={6}>
                      <FormGroup tag="fieldset">
                        <FormGroup
                          check
                          className="p-2 ml-5 mt-2 w-100  font-weight-bold"
                        >
                          <Label check>
                            <Input
                              type="radio"
                              value="newFile"
                              checked={this.state.fileType === "newFile"}
                              onChange={this.handleFileTypeChange}
                              style={{ width: 15, height: 15 }}
                            />
                            Create new configuration file
                          </Label>
                        </FormGroup>
                        <FormGroup
                          check
                          className="p-2 ml-5 mt-2 w-100 font-weight-bold"
                        >
                          <Label check>
                            <Input
                              type="radio"
                              value={"exitingFile"}
                              onChange={this.handleFileTypeChange}
                              checked={this.state.fileType === "exitingFile"}
                              style={{ width: 15, height: 15 }}
                            />{" "}
                            Edit existing file
                          </Label>
                        </FormGroup>
                      </FormGroup>
                      {this.state.fileType === "exitingFile" && (
                        <FormGroup
                          row
                          className="pl-3 ml-4 mt-4 text-justify font-weight-bold"
                        >
                          <Col sm={10}>
                            <label>Upload YML Config</label>

                            <input
                              type={"file"}
                              onChange={(e) => this.showFile(e)}
                            />
                          </Col>
                        </FormGroup>
                      )}
                    </Col>
                    {this.state.fileType === "exitingFile" && (
                      <Col
                        sm={{ size: 12, offset: 1 }}
                        className="errorMessage"
                      >
                        <span className="text-danger ">
                          {this.state.extensionError}
                        </span>
                      </Col>
                    )}
                  </CardBody>
                </div>
              )}
              <EnhancedStepForm
                fileType={this.state.fileType}
                data={this.state.data && this.state.data}
                extensionError={this.state.extensionError}
                step={this.state.step}
                handleNextPage={this.handleNextPage}
                handleBackPage={this.handleBackPage}
                recivedFormData={(data) => this.recivedFormData(data)}
                stepError={(error) => this.stepError(error)}
              />
            </Card>{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default CoreConfiguration;
