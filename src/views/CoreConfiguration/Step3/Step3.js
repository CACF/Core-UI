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
import { Row, Col, CardBody, Collapse } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Field } from "formik";
import renderInput from "../../../components/Form/RenderInput";
import TooltipMessage from "../../../components/Form/TooltipMessage";
import RenderCheckbox from "../../../components/Form/RenderCheckbox";

const Step3 = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <CardBody>
      <h5>List Generation:</h5>
      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10">
            <Field
              requiredStar
              name="lookback_days"
              component={renderInput}
              type="number"
              label="Lookback Days"
              placeholder="Lookback Days"
            />
            <TooltipMessage
              id="lookback_days"
              type="inputTooltip"
              showInfo=" The number of days that DIRBS core will look back through data from current date to determine IMSIs/MSISDNs
               which were associated with the notifiable IMEIs."
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="col-sm-10 mt-5">
            <Field
              requiredStar
              name="restrict_exceptions_list_to_blacklisted_imeis"
              component={RenderCheckbox}
              type="checkbox"
              label="Restrict Exceptions List to Blacklisted IMEIS"
            />

            <TooltipMessage
              id="restrict_exceptions_list_to_blacklisted_imeis"
              type="checkboxTooltip"
              showInfo="If true, the exception list will contain only those IMEI-IMSI pairs where the IMEI is on the blacklist.
                       By default, all IMEI-IMSI pairs part of the pairing list are output to the exception list."
            />
          </div>
        </Col>
      </Row>
      <Row lg={2} sm={1}></Row>

      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10">
            <Field
              requiredStar
              name="include_barred_imeis_in_exceptions_list"
              component={RenderCheckbox}
              type="checkbox"
              label="Include Barred IMEIS in Exceptions List"
            />
            <TooltipMessage
              id="include_barred_imeis_in_exceptions_list"
              type="checkboxTooltip"
              showInfo="If true, the IMEIs on barred list will also be included
                   in exceptions list if they are already in pairing list."
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="col-sm-10">
            <Field
              requiredStar
              name="output_invalid_imeis"
              component={RenderCheckbox}
              type="checkbox"
              label="Output Invalid IMEIS"
            />
            <TooltipMessage
              id="output_invalid_imeis"
              type="checkboxTooltip"
              showInfo="If true, output only 'valid' IMEIs.
                      Valid IMEIs start with 14 digits as they will have 15 digits if the check digit append has been enabled"
            />
          </div>
        </Col>
      </Row>

      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10">
            <Field
              requiredStar
              name="notify_imsi_change"
              component={RenderCheckbox}
              type="checkbox"
              label="Notify IMSI Change"
            />

            <TooltipMessage
              id="notify_imsi_change"
              type="checkboxTooltip"
              showInfo="If true, the notification list will also contain those IMEIs for which IMSI is changed (i.e MSISDN same)
                      by default IMEIs will not be notified."
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="col-sm-10">
            <Field
              requiredStar
              name="generate_check_digit"
              component={RenderCheckbox}
              type="checkbox"
              label="Generate Check Digit"
            />

            <TooltipMessage
              id="generate_check_digit"
              type="checkboxTooltip"
              showInfo="If true, generate a check digit for IMEIs during list generation.
                    Check digit will only be added to 'valid IMEIs' ."
            />
          </div>
        </Col>
      </Row>
      <hr />
      <h5 onClick={toggle} style={{ cursor: "pointer" }}>
        {" "}
        Threshold :{" "}
        <span className="float-right">
          {" "}
          {isOpen ? (
            <i className="fa fa-caret-up fa-lg"></i>
          ) : (
            <i className="fa fa-caret-down fa-lg"></i>
          )}{" "}
        </span>
      </h5>
      <Collapse isOpen={isOpen}>
        <h5 className="4">Pairing List Threshold :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10 mt-2">
              <Field
                requiredStar
                name="pairing_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="pairing_import_size_variation_percent"
                component={renderInput}
                type="number"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />
            </div>
          </Col>
        </Row>
        <hr />
        <h5>Stolen List Threshold :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="stolen_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />

            </div>
          </Col>

          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="stolen_import_size_variation_percent"
                component={renderInput}
                type="number"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />


            </div>
          </Col>
        </Row>

        <hr />
        <h5>Association List Threshold :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="association_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />

            </div>
          </Col>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="association_import_size_variation_percent"
                component={renderInput}
                type="number"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />
            </div>
          </Col>
        </Row>
        <hr />
        <h5>Barred List Threshold :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="barred_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />

            </div>
          </Col>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="barred_import_size_variation_percent"
                component={renderInput}
                type="number"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />
            </div>
          </Col>
        </Row>
        <hr />
        <h5>Subscribers List Threshold :</h5>

        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10 mt-2">
              <Field
                requiredStar
                name="subscribers_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="subscribers_import_size_variation_percent"
                component={renderInput}
                type="number"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />
            </div>
          </Col>
        </Row>
        <hr />

        <h5>GSMA Threshold :</h5>

        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10 mt-2">
              <Field
                requiredStar
                name="GSMA_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="GSMA_import_size_variation_percent"
                component={renderInput}
                type="text"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />
            </div>
          </Col>
        </Row>
        <hr />
        <h5>Registration List Threshold :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="registration_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="registration_import_size_variation_percent"
                component={renderInput}
                type="number"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />
            </div>
          </Col>
        </Row>

        <hr />
        <h5>Golden List Threshold :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="golden_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="golden_import_size_variation_percent"
                component={renderInput}
                type="number"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />
            </div>
          </Col>
        </Row>
        <hr />
        <h5>Barred TAC List Threshold :</h5>
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="BarredTAC_import_size_variation_absolute"
                component={renderInput}
                type="number"
                label="Import Size Variation Absolute"
                placeholder="Import Size Variation Absolute"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="col-sm-10">
              <Field
                requiredStar
                name="BarredTAC_import_size_variation_percent"
                component={renderInput}
                type="number"
                label="Import Size Variation Percent"
                placeholder="Import Size Variation Percent"
              />
            </div>
          </Col>
        </Row>
      </Collapse>
    </CardBody>
  );
};

export default Step3;
