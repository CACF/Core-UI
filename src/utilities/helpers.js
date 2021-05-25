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

import Base64 from "base-64";
import settings from "./../settings.json";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React from "react";
import i18n from "i18next";
import { ENGLISH_REGEX, SPANISH_REGEX, INDONESIAN_REGEX } from "./constants";
import { region } from "./../views/CoreConfiguration/Step1/Region";
const { defaultLanguage } = settings.appDetails;
const MySwal = withReactContent(Swal);

const { appName } = settings.appDetails;

export function getAuthHeader(token) {
  let accessToken = localStorage.getItem("token");
  if (token) {
    accessToken = token;
  }
  return {
    Authorization: "Bearer " + accessToken,
    "Content-Type": "application/json",
  };
}
export function range(start, limit, step) {
  if (arguments.length === 1) {
    limit = start;
    start = 0;
  }

  limit = limit || 0;
  step = step || 1;

  for (var result = []; (limit - start) * step > 0; start += step) {
    result.push(start);
  }
  return result;
}
export function getUserInfo() {
  return JSON.parse(Base64.decode(localStorage.getItem("userInfo")));
}

export function SweetAlert(params) {
  let title = params.title;
  let message = params.message;
  let type = params.type;

  MySwal.fire({
    title: <p>{title}</p>,
    text: message,
    type: type,
    confirmButtonText: i18n.t("button.ok"),
  });
}

/**
 * Generic Errors handling for Axios
 *
 * @param context
 * @param error
 */
export function errors(context, error) {
  if (typeof error !== "undefined") {
    if (typeof error.response === "undefined") {
      SweetAlert({
        title: i18n.t("error"),
        message: i18n.t("serverNotResponding"),
        type: "error",
      });
      //toast.error('API Server is not responding or You are having some network issues');
    } else {
      if (error.response.status === 400) {
        SweetAlert({
          title: i18n.t("error"),
          message: error.response.data.message,
          type: "error",
        });
        //toast.error(error.response.data.message);
      } else if (error.response.status === 401) {
        SweetAlert({
          title: i18n.t("error"),
          message: i18n.t("sessionExpired"),
          type: "error",
        });
        //toast.error('Your session has been expired, please wait');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else if (error.response.status === 403) {
        SweetAlert({
          title: i18n.t("error"),
          message: i18n.t("credentialMatch"),
          type: "error",
        });
        //toast.error('These credential do not match our records.');
      } else if (error.response.status === 404) {
        SweetAlert({
          title: i18n.t("error"),
          message: error.response.data.message,
          type: "error",
        });
        //toast.error(error.response.data.message);
      } else if (error.response.status === 405) {
        SweetAlert({
          title: i18n.t("error"),
          message: i18n.t("wrongHttp"),
          type: "error",
        });
        //toast.error('You have used a wrong HTTP verb');
      } else if (error.response.status === 406) {
        SweetAlert({
          title: i18n.t("error"),
          message: error.response.data.message,
          type: "error",
        });
        //toast.error(error.response.data.message);
      } else if (error.response.status === 409) {
        SweetAlert({
          title: i18n.t("error"),
          message: error.response.data.message,
          type: "error",
        });
        //toast.error(error.response.data.message, { autoClose: 10000 });
      } else if (error.response.status === 422) {
        SweetAlert({
          title: i18n.t("error"),
          message:
            error.response.data.Error === null
              ? i18n.t("unprocessibleEntity")
              : error.response.data.message.brands_list &&
                error.response.data.message.brands_list[0],
          type: "error",
        });
        // let errors = error.response.data.messages;
        // for (var key in errors) {
        //   var caseErrors = errors[key];
        //   for (var i in caseErrors) {

        //     //toast.error(caseErrors[i][0], { autoClose: 10000 });
        //   }
        // }
      } else if (error.response.status >= 500) {
        SweetAlert({
          title: i18n.t("error"),
          message: i18n.t("serverNotResponding"),
          type: "error",
        });
        //toast.error("API Server is not responding or You are having some network issues", { autoClose: 8000 });
      }
    }
  }
}

/**
 * Media query function for responsive interfaces logic
 * @param maxWidth
 * @param condition1
 * @param condition2
 * @returns {*}
 */
export function matchMedia(maxWidth, condition1, condition2) {
  return window.matchMedia(`(max-width: ${maxWidth}px)`).matches
    ? condition1
    : condition2;
}

/**
 * a function to extract an extension from file
 * @param param
 * @returns {*}
 */
export function getExtension(param) {
  return param.slice((Math.max(0, param.lastIndexOf(".")) || Infinity) + 1);
}

/**
 * this function get all groups of currently loggedIn user
 *
 * @param resources
 * @returns {string}
 */
export function getUserGroups(resources) {
  let groups = "";
  let groupDetails = ((resources || {}).realm_access || {}).roles || [];
  // Remove default group first
  let index = groupDetails.indexOf("uma_authorization");
  if (index !== -1) groupDetails.splice(index, 1);
  if (groupDetails.length > 0) {
    groups = groupDetails;
  }
  return groups;
}

/**
 * This functions get users' groups assigned by Keycloak and see if user has access to this application
 *
 * @param groups
 * @returns {boolean}
 */
export function isPage401(groups) {
  let pageStatus = false; // assume it's not page401
  pageStatus = groups.length > 0 ? false : true; // if groups exist then that's not page401
  if (!pageStatus) {
    // if groups exist then we apply another check
    pageStatus = _isValidAppName(groups) ? false : true; // app name is same as role assigned
  }
  return pageStatus;
}

/**
 *
 *
 * @param groupDetails
 * @returns {*}
 * @private
 */
function _isValidAppName(groupDetails) {
  return groupDetails.find((app) => app.split("_")[0] === appName);
}

/**
 * this function get currently loggedIn user Role
 *
 * @param resources
 * @returns {string}
 */
export function getUserRole(resources) {
  let role = "";
  let roleStatus = false;
  let groupDetails = ((resources || {}).realm_access || {}).roles || [];
  if (groupDetails.length > 0) {
    roleStatus = _isValidAppName(groupDetails) ? true : false;
    role = _isValidAppName(groupDetails);
  }
  if (roleStatus) {
    if (role.split("_")[2]) {
      role = role.split("_")[2];
    }
  }
  return role;
}

/**
 * Get current LoggedIn User Type
 *
 * @param resources
 * @returns {string}
 */
export function getUserType(resources) {
  let type = "";
  let typeStatus = false;
  let groupDetails = ((resources || {}).realm_access || {}).roles || [];
  if (groupDetails.length > 0) {
    typeStatus = _isValidAppName(groupDetails) ? true : false;
    type = _isValidAppName(groupDetails);
  }
  if (typeStatus) {
    if (type.split("_")[1]) {
      type = type.split("_")[1];
    }
  }
  return type;
}

export function languageCheck(text) {
  if (ENGLISH_REGEX.test(text) && defaultLanguage === "en") {
    return true;
  } else if (SPANISH_REGEX.test(text) && defaultLanguage === "es") {
    return true;
  } else return INDONESIAN_REGEX.test(text) && defaultLanguage === "id";
}

// check and update Token
export const updateTokenHOC = (callingFunc, kc, params) => {
  let config = null;
  if (kc.isTokenExpired(0)) {
    kc.updateToken(0)
      .success(() => {
        localStorage.setItem("token", kc.token);
        config = {
          headers: getAuthHeader(kc.token),
        };
        callingFunc(config, params);
      })
      .error(() => kc.logout());
  } else {
    config = {
      headers: getAuthHeader(),
    };
    callingFunc(config, params);
  }
};

export const propsToValuesUpdated = (data) => {
   return {
    //Step 1

    databasename: data && data.postgresql.database ? data.postgresql.database : "",
    host:data && data.postgresql.host ? data.postgresql.host : "",
    port:data && data.postgresql.port ? data.postgresql.port : "",
    user:data && data.postgresql.user ? data.postgresql.user : "",
    regionname: data && data.region.name
      ? { label: data.region.name, value: data.region.name }
      : "",
    countryCode: data && data.region.country_codes
      ? {
          value: data.region.country_codes[0],
          label: data.region.country_codes[0],
        }
      : [],
    exemptedDevice:data && data.region.exempted_device_types
      ? data.region.exempted_device_types
      : "",
    msisdnData:data && data.region.import_msisdn_data
      ? data.region.import_msisdn_data
      : false,
    rad:data && data.region.import_rat_data ? data.region.import_rat_data : false,
    region_operator:
    data && data.region && data.region.operators && data.region.operators.length > 0
        ? data.region.operators.map((item) => ({
            id: item.id,
            name: item.name,
            mcc: item.mcc_mnc_pairs[0].mcc,
            mnc: item.mcc_mnc_pairs[0].mnc,
          }))
        : [{ id: "", name: "", mcc: "", mnc: "" }],

    //Step 2
    level:data ? { value: data.logging.level, label: data.logging.level } : [],
    format:data ? data.logging.format : "",
    show_statsd_messages:data && data.logging.show_statsd_messages ? data.logging.show_statsd_messages:false ,
    show_werkzeug_messages:data &&  data.logging.show_werkzeug_messages ? data.logging.show_werkzeug_messages : false,
    show_sql_messages:data &&  data.logging.show_sql_messages ? data.logging.show_sql_messages : false,
    log_directory:data && data.logging.log_directory ? data.logging.log_directory : "",
    file_prefix:data && data.logging.file_prefix ? data.logging.file_prefix : "",
    file_rotation_max_bytes:data && data.logging.file_rotation_max_bytes ? data.logging.file_rotation_max_bytes : "",
    file_rotation_backup_count:data && data.logging.file_rotation_backup_count ? data.logging.file_rotation_backup_count : "",
    //Operator threshold
    historic_imsi_threshold:data && data.operator_threshold ? data.operator_threshold.historic_imsi_threshold : "",
    historic_imei_threshold:data && data.operator_threshold ? data.operator_threshold.historic_imei_threshold : "",
    historic_msisdn_threshold:data && data.operator_threshold ? data.operator_threshold.historic_msisdn_threshold : "",
    leading_zero_suspect_limit:data && data.operator_threshold ? data.operator_threshold.leading_zero_suspect_limit : "",
    non_home_network_threshold:data &&data.operator_threshold ? data.operator_threshold.non_home_network_threshold : "",
    null_imei_threshold:data && data.operator_threshold ? data.operator_threshold.null_imei_threshold : "",
    null_imsi_threshold: data && data.operator_threshold ? data.operator_threshold.null_imsi_threshold : "",
    null_msisdn_threshold:data && data.operator_threshold ? data.operator_threshold.null_msisdn_threshold : "",
    null_rat_threshold:data && data.operator_threshold ? data.operator_threshold.null_rat_threshold : "",
    null_threshold:data && data.operator_threshold ? data.operator_threshold.null_threshold : "",
    out_of_region_imsi_threshold:data && data.operator_threshold ? data.operator_threshold.out_of_region_imsi_threshold : "",
    out_of_region_msisdn_threshold:data && data.operator_threshold ? data.operator_threshold.out_of_region_msisdn_threshold : "",
    out_of_region_threshold:data && data.operator_threshold ? data.operator_threshold.out_of_region_threshold :"",
    unclean_imei_threshold:data && data.operator_threshold ? data.operator_threshold.unclean_imei_threshold : "",
    unclean_imsi_threshold: data && data.operator_threshold ?  data.operator_threshold.unclean_imsi_threshold : "",
    unclean_threshold:data && data.operator_threshold ?  data.operator_threshold.unclean_threshold : "",

    //Step 3
    lookback_days:data && data.list_generation ?  data.list_generation.lookback_days : "",
    restrict_exceptions_list_to_blacklisted_imeis:data &&data.list_generation ? data.list_generation.restrict_exceptions_list_to_blacklisted_imeis : false,
    generate_check_digit:data && data.list_generation ? data.list_generation.generate_check_digit : false,
    output_invalid_imeis:data && data.list_generation ? data.list_generation.output_invalid_imeis : false,
    include_barred_imeis_in_exceptions_list: data && data.list_generation ? data.list_generation.include_barred_imeis_in_exceptions_list : false,
    notify_imsi_change:data &&  data.list_generation ?  data.list_generation.notify_imsi_change : false,

    GSMA_import_size_variation_absolute:data && data.gsma_threshold ?  data.gsma_threshold.import_size_variation_absolute : "",
    GSMA_import_size_variation_percent:data && data.gsma_threshold ?  data.gsma_threshold.import_size_variation_percent : "",

    pairing_import_size_variation_absolute: data && data.pairing_list_threshold ?  data.pairing_list_threshold.import_size_variation_absolute : "",
    pairing_import_size_variation_percent:data && data.pairing_list_threshold ?  data.pairing_list_threshold.import_size_variation_percent : "",

    stolen_import_size_variation_absolute:data && data.stolen_list_threshold ? data.stolen_list_threshold.import_size_variation_absolute : "",
    stolen_import_size_variation_percent:data && data.stolen_list_threshold ?  data.stolen_list_threshold.import_size_variation_percent : "",

    registration_import_size_variation_absolute:data && data.registration_list_threshold ?  data.registration_list_threshold.import_size_variation_absolute : "",
    registration_import_size_variation_percent: data && data.registration_list_threshold ?  data.registration_list_threshold.import_size_variation_percent : "", 

    golden_import_size_variation_absolute:data && data.golden_list_threshold ?  data.golden_list_threshold.import_size_variation_absolute : "",
    golden_import_size_variation_percent:data && data.golden_list_threshold ?  data.golden_list_threshold.import_size_variation_percent : "",

    barred_import_size_variation_absolute:data && data.barred_list_threshold ?  data.barred_list_threshold.import_size_variation_absolute : "",
    barred_import_size_variation_percent:data && data.barred_list_threshold ?  data.barred_list_threshold.import_size_variation_percent : "",

    BarredTAC_import_size_variation_absolute:data &&  data.barred_tac_list_threshold ?  data.barred_tac_list_threshold.import_size_variation_absolute : "",
    BarredTAC_import_size_variation_percent:data &&   data.barred_tac_list_threshold ? data.barred_tac_list_threshold.import_size_variation_percent : "",

    subscribers_import_size_variation_absolute:data &&  data.subscribers_list_threshold ?  data.subscribers_list_threshold.import_size_variation_absolute : "",
    subscribers_import_size_variation_percent:data && data.subscribers_list_threshold ?  data.subscribers_list_threshold.import_size_variation_percent : "",

    association_import_size_variation_absolute:data &&   data.association_list_threshold ? data.association_list_threshold.import_size_variation_absolute : "",
    association_import_size_variation_percent:data && data.association_list_threshold ? data.association_list_threshold.import_size_variation_percent : "",

    //Step 4
    amnesty_enabled:data && data.amnesty ? data.amnesty.amnesty_enabled : false,
    evaluation_period_end_date:
       data && data.amnesty.amnesty_enabled === true
        ? `${data.amnesty.evaluation_period_end_date.toString().slice(0, 4)}-${data.amnesty.evaluation_period_end_date.toString().slice(4, 6)}-${data.amnesty.evaluation_period_end_date.toString().slice(6, 8)}`
        : "",
    amnesty_period_end_date:
      data && data.amnesty.amnesty_enabled === true
        ?`${data.amnesty.amnesty_period_end_date.toString().slice(0, 4)}-${data.amnesty.amnesty_period_end_date.toString().slice(4, 6)}-${data.amnesty.amnesty_period_end_date.toString().slice(6, 8)}`
        : "",
    months_retention:data &&  data.data_retention ?  data.data_retention.months_retention : "",
    blacklist_retention: data && data.data_retention ? data.data_retention.blacklist_retention : "",
    statsd_port:data &&  data.statsd ?  data.statsd.port : "",
    max_db_connections:data &&  data.multiprocessing ? data.multiprocessing.max_db_connections : "",
    max_local_cpus:data && data.multiprocessing.max_local_cpus ? data.multiprocessing.max_local_cpus : 0 ,
    blacklist_violations_grace_period_days:data &&  data.report_generation ? data.report_generation.blacklist_violations_grace_period_days : "",
    redis_hostname: data && data.redis ? data.redis.hostname : "",
    redis_port: data &&  data.redis  ?data.redis.port :"",
    redis_password:data &&  data.redis  ? data.redis.password : "",
    db: data &&  data.redis  ? data.redis.db : "",
    cache_timeout:data && data.redis ? data.redis.cache_timeout : "",

    //step 5
    perform_prevalidation: data &&  data.catalog ?  data.catalog.perform_prevalidation : "",
    catalog: data && data.catalog.prospectors ? data.catalog.prospectors.map((item) => ({
      file_type:{
              value: item.file_type,
              label: item.file_type.replace(/(?:_| |\b)(\w)/g, function ($1) {
                return $1.toUpperCase().replace("_", " ");
              }),
            },
      paths: item.paths !==null ? item.paths.toString() : "",
      schema_filename: item.schema_filename,
    })) : [{ file_type: "", paths: "", schema_filename: "" }],
    //  [{ file_type: "", paths: "", schema_filename: "" }],
    //step 6
    activate_whitelist: data &&   data.operational ? data.operational.activate_whitelist : false,
    restrict_whitelist: data &&  data.operational ? data.operational.restrict_whitelist : false,
    kafka_hostname:
       data &&data.operational.activate_whitelist === true
        ? data.broker.kafka.hostname
        : "",
    kafka_port:
       data && data.operational.activate_whitelist === true
        ? data.broker.kafka.port
        : "",
    kafka_topic:
       data &&data.operational.activate_whitelist === true
        ? data.broker.kafka.topic
        : "",
    security_protocol:
      data && data.operational.activate_whitelist === true
        ? {
            value: data.broker.kafka.security_protocol,
            label: data.broker.kafka.security_protocol.toUpperCase(),
          }
        : "",

    client_certificate: data && data.broker
      ? data.broker.kafka.security_protocol === "ssl"
        ? data.broker.kafka.caroot_certificate
        : ""
      : "",
    skip_tls_verifications: data && data.broker
      ? data.broker.kafka.security_protocol === "ssl"
        ? data.broker.kafka.skip_tls_verifications
        : ""
      : "",
    caroot_certificate: data && data.broker
      ? data.broker.kafka.security_protocol === "ssl"
        ? data.broker.kafka.caroot_certificate
        : ""
      : "",
    client_key: data && data.broker
      ? data.broker.kafka.security_protocol === "ssl"
        ? data.broker.kafka.client_key
        : ""
      : "",
    broker_operator:data && data.operational.activate_whitelist === true
        ? data.broker.operators.map((item) => ({
            id: item.id,
            name: item.name,
            topic: item.topic,
          }))
        : [{ id: "", name: "", topic: "" }],

    //Step 7
    conditions:data ? data.conditions === undefined ||
      data.conditions[0]===null ||
      data.conditions === null
        ? [
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
                },
              ],
            },
          ]
        : data.conditions.map((item) => ({
            label: item.label ? item.label : "",
            grace_period_days: item.grace_period_days === 0 || item.grace_period_days
              ? item.grace_period_days
              : "",
            max_allowed_matching_ratio: item.max_allowed_matching_ratio
              ? item.max_allowed_matching_ratio
              : "",
            reason: item.reason ? item.reason : "",
            blocking: item.blocking ? item.blocking : "",
            dimension:
              item.dimensions === null || item.dimensions[0] === null
                ? [
                    {
                      module: [],
                      threshold: "",
                      period_days: "",
                      min_seen_days: "",
                      period_months: "",
                      use_msisdn: "",
                      period: "",
                      num_msisdns: "",
                      lookback_days: "",
                      monitored_days: 0,
                       rbi_delays: {
                    ignore_rbi_delays: false,
                    "rbi_00": 32,
                    "rbi_01": 40,
                    "rbi_35": 20,
                    "rbi_86": 19,
                    "rbi_91": 20,
                    "rbi_99": 69,
                  }
                    },
                  ]
                : item.dimensions.map((items) => ({
                    module: { label: items.module.replace(/(?:_| |\b)(\w)/g, function ($1) {
                      return $1.toUpperCase().replace("_", " ");
                    }), value: items.module },
                    threshold: items.parameters
                      ? items.parameters["threshold"]
                        ? items.parameters["threshold"]
                        : ""
                      : "",

                    period_days: items.parameters
                      ? items.parameters["period_days"]
                        ? items.parameters["period_days"]
                        : ""
                      : "",

                    min_seen_days: items.parameters
                      ? items.parameters["min_seen_days"]
                        ? items.parameters["min_seen_days"]
                        : ""
                      : "",

                    period_months: items.parameters
                      ? items.parameters["period_months"]
                        ? items.parameters["period_months"]
                        : ""
                      : "",

                    use_msisdn: items.parameters
                      ? items.parameters["use_msisdn"]
                        ? items.parameters["use_msisdn"]
                        : false
                      : false,

                    period: items.parameters
                      ? items.parameters["period"]
                        ? items.parameters["period"]
                        : ""
                      : "",

                    num_msisdns: items.parameters
                      ? items.parameters["num_msisdns"]
                        ? items.parameters["num_msisdns"]
                        : ""
                      : "",

                    lookback_days: items.parameters
                      ? items.parameters["lookback_days"]
                        ? items.parameters["lookback_days"]
                        : ""
                      : "",

                    monitored_days: items.parameters
                      ? items.parameters["monitored_days"] === 0 || items.parameters["monitored_days"]
                        ? items.parameters["monitored_days"]
                        : ""
                      : "",
                      rbi_delays:items.parameters?
                      items.parameters["per_rbi_delays"]
                      ?
                       {
                        
                        ignore_rbi_delays:items.parameters["ignore_rbi_delays"],
                        "rbi_00": items.parameters["per_rbi_delays"]["00"],
                        "rbi_01": items.parameters["per_rbi_delays"]["01"],
                        "rbi_35": items.parameters["per_rbi_delays"]["35"],
                        "rbi_86": items.parameters["per_rbi_delays"]["86"],
                        "rbi_91": items.parameters["per_rbi_delays"]["91"],
                        "rbi_99": items.parameters["per_rbi_delays"]["99"],
                      } : ""
                      :"",
                  })),
          }))

          : [
            {
              label: "",
              grace_period_days: "",
              max_allowed_matching_ratio: "",
              reason: "",
              blocking: false,
              dimension: [
                {
                  module: {},
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
                    "rbi_00": 32,
                    "rbi_01": 40,
                    "rbi_35": 20,
                    "rbi_86": 19,
                    "rbi_91": 20,
                    "rbi_99": 69,
                  },
                },
              ],
            },
          ]
  };
};

export const CountryNameCode = (countryName, code) => {
  return region.find(
    (objs) => objs.name === countryName && objs.dial_code === code
  );
};
