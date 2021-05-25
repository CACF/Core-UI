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

import {
  Row,
  Col,
  CardBody,
  Collapse,
} from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Field} from "formik";
import renderInput from "../../../components/Form/RenderInput";
import TooltipMessage from "../../../components/Form/TooltipMessage";
import RenderSelect from "../../../components/Form/RenderSelect";
import RenderCheckbox from "../../../components/Form/RenderCheckbox";

import React from "react";
const Step2 = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
     
        <CardBody className="fadein">
        <h5>Logging :</h5>
              <Row lg={2} sm={1}>
                <Col md={6}>
                  <div className="col-sm-10 mt-2">
                  <RenderSelect
                value={props.values.level}
                onChange={props.setFieldValue}
                options={[{value:"info",label:"Info"},{value:"debug",label:"Debug"}]}
                onBlur={props.setFieldTouched}
                error={props.errors.level}
                touched={props.touched.level}
                fieldName="level"
                label={"Select Level"}
                placeholder={"Select Level"}
                
                stayOpen={true}
                multi={true}
              />
              <TooltipMessage
                id="level"
                type="inputTooltip"
                showInfo="Logging level determines the verbosity of logs. This is also set to 'debug' by the -v CLI option."
              />

                  </div>
                </Col>

                <Col md={6}>
                  <div className="col-sm-10">
                    <Field
                     
                      name="format"
                      component={renderInput}
                      type="text"
                      label="Format"
                      placeholder="Format"
                    />
                    <TooltipMessage
                      id="format"
                      type="inputTooltip"
                      showInfo="Format string can be configured here."
                    />
                  </div>
                </Col>
              </Row>
              <Row lg={2} sm={1}>
                <Col md={6}>
                  <div className="col-sm-10">
                    <Field
                     
                      name="log_directory"
                      component={renderInput}
                      type="text"
                      label="Log Directory"
                      placeholder="Log Directory"
                    />
                    <TooltipMessage
                      id="log_directory"
                      type="inputTooltip"
                      showInfo="If log_directory is set to a value that is not null, DIRBS will log to a file as well as to the console. The
                       log files will all be generated in the directory specified by this setting. This directory needs to exist and
                        be writable."
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="col-sm-10">
                    <Field
                     
                      name="file_prefix"
                      component={renderInput}
                      type="text"
                      label="File Prefix"
                      placeholder="File Prefix"
                    />

                    <TooltipMessage
                      id="file_prefix"
                      type="inputTooltip"
                      showInfo="Set this value if you want to prefix all log files created on this host with a prefix
                                to distinguish them from other host."
                    />
                  </div>
                </Col>
              </Row>
              <Row lg={2} sm={1}>
                <Col md={6}>
                  <div className="col-sm-10 mt-2">
                    <Field
                      requiredStar
                      name="file_rotation_max_bytes"
                      component={renderInput}
                      type="number"
                      label="File Rotation Max Bytes"
                      placeholder="File Rotation Max Bytes"
                    />
                    <TooltipMessage
                      id="file_rotation_max_bytes"
                      type="inputTooltip"
                      showInfo="Set the number of bytes before a logfile is rotated. If this or file_rotation_backup_count is zero, rotation
                                is disabled."
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="col-sm-10">
                    <Field
                      requiredStar
                      name="file_rotation_backup_count"
                      component={renderInput}
                      type="number"
                      label="File Rotation Backup Count"
                      placeholder="File Rotation Backup Count"
                    />
                    <TooltipMessage
                      id="file_rotation_backup_count"
                      type="inputTooltip"
                      showInfo="Sets the numbwe old logs to keep."
                    />
                  </div>
                </Col>
              </Row>
              <Row lg={2} sm={1}>
                <Col md={6}>
                  <div className="col-sm-10 mt-2">
                    <Field
                      requiredStar
                      name="show_statsd_messages"
                      component={RenderCheckbox}
                      type="checkbox"
                      label="Show Statsd Messages"
                    />
                    <TooltipMessage
                      id="show_statsd_messages"
                      type="checkboxTooltip"
                      showInfo="Set this to true if you want to see logging message for StatsD."
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="col-sm-10">
                    <Field
                      requiredStar
                      name="show_werkzeug_messages"
                      component={RenderCheckbox}
                      type="checkbox"
                      label="Show Werkzeug Messages"
                    />
                    <TooltipMessage
                      id="show_werkzeug_messages"
                      type="checkboxTooltip"
                      showInfo="Set this to true if you want to see Werkzeug internal log messages from TAC/IMEI APIs."
                    />
                  </div>
                </Col>
              </Row>
              <Row lg={2} sm={1}>
                <Col md={6}>
                  <div className="col-sm-10">
                    <Field
                      requiredStar
                      name="show_sql_messages"
                      component={RenderCheckbox}
                      type="checkbox"
                      label="Show SQL Messages"
                    />
                    <TooltipMessage
                      id="show_sql_messages"
                      type="checkboxTooltip"
                      showInfo="Set this to true if you want to see SQL messages from DIRBS (most are debug level)."
                    />
                  </div>
                </Col>
              </Row>
              <hr />
          <h5 onClick={toggle} style={{cursor: "pointer"}} >Operator Threshold :    
         
         
         
            
              <span className="float-right"> { isOpen ? <i className="fa fa-caret-up fa-lg"></i> : <i className="fa fa-caret-down fa-lg"></i> } </span></h5>
              
          <Collapse isOpen={isOpen}>
          <Row lg={2} sm={1} >
            <Col md={6}>
              <div className="col-sm-10 mt-2">
              <Field
                requiredStar
                name="null_imei_threshold"
                component={renderInput}
                type="number"
          
                label="Null IMEI Threshold"
                placeholder="Null IMEI Threshold"
              />
                <TooltipMessage
                  id="null_imei_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of the entries in the data that are allowed to have a NULL IMEI."
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="null_imsi_threshold"
                component={renderInput}
                type="number"
                label="Null IMSI Threshold"
                placeholder="Null IMSI Threshold"
              />
                <TooltipMessage
                  id="null_imsi_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of the entries in the data that are allowed to have a NULL IMSI."
                />
              </div>
            </Col>
          </Row>
          <Row lg={2} sm={1}>
            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="null_msisdn_threshold"
                component={renderInput}
                type="number"
                label="Null MSISDN Threshold"
                placeholder="Null MSISDN Threshold: "
              />
                 <TooltipMessage
                  id="null_msisdn_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of the entries in the data that are allowed to have a NULL MSISDN (ignored if MSISDN disabled)."
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="null_rat_threshold"
                component={renderInput}
                type="number"
                label="Null RAT Threshold"
                placeholder="Null RAT Threshold: "
              />

            <TooltipMessage
                  id="null_rat_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of the entries in the data that are allowed to have a NULL RAT (ignored if RAT disabled)."
                />
              </div>
            </Col>
          </Row>
          <Row lg={2} sm={1}>
            <Col md={6}>
              <div className="col-sm-10 mt-2">
              <Field
                requiredStar
                name="null_threshold"
                component={renderInput}
                type="number"
                label="Null Threshold"
                placeholder="Null Threshold: "
              />
                <TooltipMessage
                  id="null_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of the entries in the data that are allowed to have any column equal to NULL
                       This only includes columns enabled in the import (MSISDN and RAT may be excluded)."
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="unclean_imei_threshold"
                component={renderInput}
                type="number"
                label="Unclean IMEI Threshold"
                placeholder="Unclean IMEI Threshold: "
              />
                <TooltipMessage
                  id="unclean_imei_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of the non-NULL IMEIs in the data that are allowed to not start with 14 digits."
                />
              </div>
            </Col>
          </Row>
          <Row lg={2} sm={1}>
            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="unclean_imsi_threshold"
                component={renderInput}
                type="number"
                label="Unclean IMSI Threshold"
                placeholder="Unclean IMSI Threshold: "
              />
                 <TooltipMessage
                  id="unclean_imsi_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of the non-NULL IMSIs in the data that are allowed to not be 14-15 digits."
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="unclean_threshold"
                component={renderInput}
                type="number"
                label="Unclean Threshold"
                placeholder="Unclean threshold"
              />
            <TooltipMessage
                  id="unclean_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of entries in the data that are allowed to have either a unclean IMEI or an unclean IMSI."
                />
              </div>
            </Col>
          </Row>

          <Row lg={2} sm={1}>
            <Col md={6}>
              <div className="col-sm-10 mt-2">
              <Field
                requiredStar
                name="out_of_region_imsi_threshold"
                component={renderInput}
                type="number"
                label="Out of Region IMSI Threshold"
                placeholder=" Out of Region IMSI Threshold"
              />
                <TooltipMessage
                  id="out_of_region_imsi_threshold"
                  type="inputTooltip"
                  showInfo="The proportion of the non-NULL IMSIs in the data that are allowed to have a MCC that does not match the
                             configured region."
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="out_of_region_msisdn_threshold"
                component={renderInput}
                type="number"
                label="Out of Region MSISDN Threshold"
                placeholder=" Out of Region MSISDN Threshold"
              />
                <TooltipMessage
                  id="out_of_region_msisdn_threshold"
                  type="inputTooltip"
                  showInfo="The combined proportion of entries in the data that are allowed to have either a CC (IMSI) or MCC (MSISDN)
                  that does not match the configured region. Ignored if MSISDN if disabled, as this would then be the same as the
                  out of region IMSI check."
                />
              </div>
            </Col>
          </Row>
          <Row lg={2} sm={1}>
            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="out_of_region_threshold"
                component={renderInput}
                type="number"
                label="Out of Region Threshold"
                placeholder="Out of Region Threshold"
              />
                 <TooltipMessage
                  id="out_of_region_threshold"
                  type="inputTooltip"
                  showInfo="Host that the PostgreSQL server runs on. Overridden by environment variable DIRBS_DB_HOST if set."
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="non_home_network_threshold"
                component={renderInput}
                type="number"
                label="Non Home Network Threshold"
                placeholder="Non Home Network Threshold"
              />
            <TooltipMessage
                  id="user"
                  type="inputTooltip"
                  showInfo="The proportion of the entries in the data that are allowed to have an IMSI not starting with one of the MCC-MNC
                            prefixes associated with the operator the data is being imported for."
                />
              </div>
            </Col>
          </Row>

          <Row lg={2} sm={1}>
            <Col md={6}>
              <div className="col-sm-10 mt-2">
              <Field
                requiredStar
                name="historic_imei_threshold"
                component={renderInput}
                type="number"
                label="Historic IMEI Threshold"
                placeholder="Historic IMEI Threshold"
              />
                <TooltipMessage
                  id="historic_imei_threshold"
                  type="inputTooltip"
                  showInfo=" The minimum valid ratio of average daily IMEI count against historical daily IMEI count for a data dump to be
                             considered valid."
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="historic_imsi_threshold"
                component={renderInput}
                type="number"
                label="Historic IMSI Threshold"
                placeholder="Historic IMSI Threshold"
              />
                <TooltipMessage
                  id="historic_imsi_threshold"
                  type="inputTooltip"
                  showInfo="The minimum valid ratio of average daily IMSI count against historical daily IMSI count for a data dump to be
                            considered valid."
                />
              </div>
            </Col>
          </Row>
          <Row lg={2} sm={1}>
            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="historic_msisdn_threshold"
                component={renderInput}
                type="number"
                label="Historic MSISDN Threshold"
                placeholder="Historic MSISDN Threshold"
              />
                 <TooltipMessage
                  id="historic_msisdn_threshold"
                  type="inputTooltip"
                  showInfo="The minimum valid ratio of average daily MSISDN count against historical daily MSISDN count for a data dump to be
                  considered valid. Ignored if MSISDN if disabled."
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="col-sm-10">
              <Field
                requiredStar
                name="leading_zero_suspect_limit"
                component={renderInput}
                type="number"
                label="Leading Zero Suspect Limit"
                placeholder="Leading Zero Suspect Limit"
              />
            <TooltipMessage
                  id="leading_zero_suspect_limit"
                  type="inputTooltip"
                  showInfo="Limit for suspected leading zeros in operator data dump. The value can be between 0-1, default is 0.5
                         Leading zero check is used to validate that the input file did not have leading zeroes stripped from it."
                />
              </div>
            </Col>
          </Row>

          </Collapse>
   
       
        </CardBody>
    
    </>
  );
};

export default Step2;
