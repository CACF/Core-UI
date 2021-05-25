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

import { Row, Col, Label, CardBody,Collapse } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Field } from "formik";
import renderInput from "../../../components/Form/RenderInput";
import TooltipMessage from "../../../components/Form/TooltipMessage";
import RenderCheckbox from "../../../components/Form/RenderCheckbox";
import RenderDatePicker from "../../../components/Form/RenderDatePicker";
import renderError from "../../../components/Form/RenderError";
const Step4 = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
  return (
    <CardBody>
      <h5>Amnesty :</h5>

      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10 mt-3">
            <Field
            
              name="amnesty_enabled"
              component={RenderCheckbox}
              type="checkbox"
              label="Amnesty Enabled"
            />
            <TooltipMessage
              id="amnesty_enabled"
              type="checkboxTooltip"
              showInfo="Boolean value to indicate whether to enable this feature or not."
            />
          </div>
        </Col>
      </Row>
      {props.values.amnesty_enabled === true && (
        <Row lg={2} sm={1}>
          <Col md={6}>
            <div className="col-sm-10">
              <Label>
                Evaluation Period End Date <span className="text-danger">*</span>
               
              </Label>
              <RenderDatePicker
                requiredStar
                name="evaluation_period_end_date"
                value={props.values.evaluation_period_end_date}
                onChange={props.setFieldValue}
                onBlur={props.setFieldTouched}
                curDate={props.values.evaluation_period_end_date}
              />
              <Field
                name="evaluation_period_end_date"
                component={renderError}
              />
              <TooltipMessage
                id="evaluation_period_end_date"
                type="inputTooltip"
                showInfo="End date of the amnesty evaluation period and start of the amnesty period."
              />
            </div>
          </Col>
          <Col md={2} sm={1}>
            <div className="col-sm-10">
              <Label>
                Amnesty Period End Date <span className="text-danger">*</span>
              </Label>
              <RenderDatePicker
                name="amnesty_period_end_date"
                value={props.values.amnesty_period_end_date}
                onChange={props.setFieldValue}
                onBlur={props.setFieldTouched}
                curDate={props.values.amnesty_period_end_date}
              />
              <Field name="amnesty_period_end_date" component={renderError} />
              <TooltipMessage
                id="amnesty_period_end_date"
                type="inputTooltip"
                showInfo="End of amnesty period.  Must be greater than the evaluation period end date."
              />
            </div>
          </Col>
        </Row>
      )}
      <hr />

      <h5>Data Retention :</h5>

      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10 mt-2">
            <Field
              requiredStar
              name="months_retention"
              component={renderInput}
              type="number"
              min="0"
              label="Months Retention"
              placeholder="Months Retention"
            />
            <TooltipMessage
              id="months_retention"
              type="inputTooltip"
              showInfo="The number of months from the start of the current months that DIRBS core
               will retain data about a triplet seen in its DB. After this time, the triplet
               will be erased from the monthly_network_triplets tables (country and per-MNO).
               The IMEI will continue to be stored after this date as it is needed for continued
              list generation, etc. All references to IMSI and MSISDN will be pruned after this date."
            />
          </div>
        </Col>
        <Col md={6}>
          <h5 style={{ top: "-30px", position: "absolute" }}>Statsd: </h5>
          <div className="col-sm-10 mt-2">
            <Field
      
              name="statsd_port"
              component={renderInput}
              type="text"
              label="Port"
              placeholder="Port"
            />
            <TooltipMessage
              id="statsd_port"
              type="inputTooltip"
              showInfo=" The UDP port that the StatsD server is listening on for metrics. Overridden by environment
               variable DIRBS_STATSD_PORT."
            />
          </div>
        </Col>
      </Row>

      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10 mt-3">
            <Field
             
              name="blacklist_retention"
              component={RenderCheckbox}
              label="Blacklist Retention"
            />
            <TooltipMessage
              id="blacklist_retention"
              type="checkboxTooltip"
              showInfo="Set the retention period for blacklist."
            />
          </div>
        </Col>
        </Row>
        <hr />
        <Row>
        <Col md={6}>
          <h5 style={{}}>Multiprocessing :</h5>
          <div className="col-sm-10 mt-2">
            <Field
              requiredStar
              name="max_db_connections"
              component={renderInput}
              type="number"
              min="0"
              label="Max DB Connections"
              placeholder="Max DB Connections"
            />
            <TooltipMessage
              id="max_db_connections"
              type="inputTooltip"
              showInfo="  The maximum number of database connections to use to parallelise DIRBS Core tasks. PostgreSQL 9.6 has support
              for parellelising tasks internally - this setting does not affect parellelisation for a single connection.
              Where PostgreSQL is unable to parallelise a single query by itself, we use this number of workers to issue
               multiple queries at once on different connections. Generally this scales very well - it is safe to set this
               reasonably high. It should probably be set to roughly the number of disks in your RAID array in case there are
               I/O intensive DB operations going on. If using SSD, can be set to a higher value."
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="col-sm-10 mt-2">
            <Field
              name="max_local_cpus"
              component={renderInput}
              type="number"
              min="0"
              label="Max local CPUS"
              placeholder="Max local CPUS"
            />
            <TooltipMessage
              id="max_local_cpus"
              type="inputTooltip"
              showInfo="The maximum number of local processing blade workers to use to achieve DIRBS Core tasks. This is particularly
              useful for pre-validation of large operator import jobs where we can run multiple instances of the pre-validator
             in parallel on different parts of the file. The default is to use half of the available CPUs in the
             system will be used."
            />
          </div>
        </Col>
      </Row>
      <hr />
      <h5>Report Generation :</h5>

      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10 mt-2">
            <Field
              requiredStar
              name="blacklist_violations_grace_period_days"
              component={renderInput}
              type="number"
              label="Blacklist Violations Grace Period Days"
              placeholder="Blacklist Violations Grace Period Days"
            />
            <TooltipMessage
              id="blacklist_violations_grace_period_days"
              type="inputTooltip"
              showInfo="This setting is used by blacklist violations and stolen list violations reports to give the MNO
               some processing time (in days) before an IMEI appearing on the network is considered a violation"
            />
          </div>
        </Col>
  
      </Row>
      <hr />
      
      <h5 onClick={toggle} style={{cursor: "pointer"}} > Redis :  <span className="float-right"> { isOpen ? <i className="fa fa-caret-up fa-lg"></i> : <i className="fa fa-caret-down fa-lg"></i> } </span></h5> 
      <Collapse isOpen={isOpen}>
      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10 mt-2">
            <Field
              requiredStar
              name="redis_hostname"
              component={renderInput}
              type="text"
              label="Hostname"
              placeholder="Hostname"
            />
            <TooltipMessage
              id="redis_hostname"
              type="inputTooltip"
              showInfo="The hostname for the Redis server. Overriding by environment variable DIRBS_REDIS_HOST if set.
                        The default hostname is set to localhost if not set here."
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="col-sm-10 mt-2">
            <Field
              requiredStar
              name="redis_port"
              component={renderInput}
              type="text"
              label="Port"
              placeholder="Port"
            />
            <TooltipMessage
              id="redis_port"
              type="inputTooltip"
              showInfo="The port number that the Redis server is listening on. Overridden by environment variable
                        DIRBS_REDIS_PORT if set. The default port is 6379 if not set here."
            />
          </div>
        </Col>
      </Row>

      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10 mt-2">
            <Field
              name="redis_password"
              component={renderInput}
              type="password"
              label="Password"
              placeholder="Password"
            />
            <TooltipMessage
              id="redis_password"
              type="inputTooltip"
              showInfo="The password for the redis server. Overriding by environment variable DIRBS_REDIS_PASSWORD if set.
                     The default is none, to enable it uncomment the below to specify the passowrd."
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="col-sm-10 mt-2">
            <Field
              name="cache_timeout"
              component={renderInput}
              type="number"
              label="Cache Timeout"
              placeholder="Cache Timeout"
            />
            <TooltipMessage
              id="cache_timeout"
              type="inputTooltip"
              showInfo="Cache timeout in seconds, Overridden by environment varaible DIRBS_REDIS_CACHE_TIMEOUT if set.
                          The default value is 5 minutes i.e 300 seconds if not specified."
            />
          </div>
        </Col>
      </Row>
      <Row lg={2} sm={1}>
        <Col md={6}>
          <div className="col-sm-10 mt-2">
            <Field
              name="db"
              component={renderInput}
              type="number"
              min="0"
              label="DB"
              placeholder="DB"
            />
            <TooltipMessage
              id="db"
              type="inputTooltip"
              showInfo="The redis db instance to be used as cache. Overridden by DIRBS_REDIS_DB if set.
                          The default is set to instance 0."
            />
          </div>
        </Col>
        </Row>
    
    </Collapse>
    </CardBody>
  );
};

export default Step4;
