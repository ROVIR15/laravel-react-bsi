import React from 'react';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';

const Invoice = () => {
  return (
    <div className="wk_container">
      <div className="wk_invoice_wrap">
        <div className="wk_invoice wk_style1" id="wk_download_section">
          <div className="wk_invoice_in">
            <div className="wk_invoice_head wk_mb20">
              <div className="wk_invoice_left">
                <div className="wk_logo wk_size1">
                  <img src="assets/img/logo.svg" alt="Logo" />
                </div>
              </div>
              <div className="wk_invoice_right wk_text_right">
                <b className="wk_f20 wk_medium wk_primary_color">Laralink Ltd</b>
                <p className="wk_m0 wk_f12">
                  86-90 Paul Street, London <br />
                  England EC2A 4NE
                </p>
              </div>
            </div>
            <hr className="wk_mb8" />
            <div className="wk_flex wk_flex_column_sm wk_justify_between wk_align_center wk_align_start_sm wk_medium wk_mb10">
              <p className="wk_m0">
                Airway Bill No: <br />
                <b className="wk_primary_color">D0129888</b>
              </p>
              <p className="wk_m0">
                Invoice No: <br />
                <b className="wk_primary_color">LL098342</b>
              </p>
              <p className="wk_m0">
                Invoice Date: <br />
                <b className="wk_primary_color">12 July 2022</b>
              </p>
              <p className="wk_m0">
                Date of Export: <br />
                <b className="wk_primary_color">15 August 2022</b>
              </p>
            </div>
            <hr className="wk_mb20" />
            <div className="wk_box_3 wk_mb20">
              <div>
                <p className="wk_mb5">
                  <b className="wk_primary_color">Exporter / Shipper:</b>
                </p>
                <ul>
                  <li>
                    <span>Company Name: </span>
                    <span className="wk_primary_color">ABC Company</span>
                  </li>
                  <li>
                    <span>Address: </span>
                    <span className="wk_primary_color">
                      84 Spilman Street <br />
                      London, United Kingdom
                    </span>
                  </li>
                  <li>
                    <span>Contact Name: </span>
                    <span className="wk_primary_color">Jhon Doe</span>
                  </li>
                  <li>
                    <span>Phone Number: </span>
                    <span className="wk_primary_color">543-123-4329</span>
                  </li>
                  <li>
                    <span>Email: </span>
                    <span className="wk_primary_color">abc@gmail.com</span>
                  </li>
                  <li>
                    <span>Country of Export: </span>
                    <span className="wk_primary_color">United Kingdom</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="wk_mb5">
                  <b className="wk_primary_color">Ship To / Cosignee:</b>
                </p>
                <ul>
                  <li>
                    <span>Company Name: </span>
                    <span className="wk_primary_color">Laralink Ltd</span>
                  </li>
                  <li>
                    <span>Address: </span>
                    <span className="wk_primary_color">
                      86-90 Paul Street, London <br />
                      England EC2A 4NE
                    </span>
                  </li>
                  <li>
                    <span>Contact Name: </span>
                    <span className="wk_primary_color">Lowell H. Dominguez</span>
                  </li>
                  <li>
                    <span>Phone Number: </span>
                    <span className="wk_primary_color">324-123-2341</span>
                  </li>
                  <li>
                    <span>Email: </span>
                    <span className="wk_primary_color">laralink007@gmail.com</span>
                  </li>
                  <li>
                    <span>Country of Destination: </span>
                    <span className="wk_primary_color">United Kingdom</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="wk_table wk_style1">
              <div className="wk_border">
                <div className="wk_table_responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="wk_width_6 wk_semi_bold wk_primary_color wk_gray_bg">Item</th>
                        <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg">Price</th>
                        <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg">Qty</th>
                        <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg wk_text_right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="wk_width_6">Laser Mouse</td>
                        <td className="wk_width_2">$150</td>
                        <td className="wk_width_2">12</td>
                        <td className="wk_width_2 wk_text_right">$1800</td>
                      </tr>
                      <tr>
                        <td className="wk_width_6">Dual XL Monitors</td>
                        <td className="wk_width_2">$300</td>
                        <td className="wk_width_2">15</td>
                        <td className="wk_width_2 wk_text_right">$4500</td>
                      </tr>
                      <tr>
                        <td className="wk_width_6">Multi-jet Printer</td>
                        <td className="wk_width_2">$350</td>
                        <td className="wk_width_2">05</td>
                        <td className="wk_width_2 wk_text_right">$1750</td>
                      </tr>
                      <tr>
                        <td className="wk_width_6">USB Cable</td>
                        <td className="wk_width_2">$10</td>
                        <td className="wk_width_2">100</td>
                        <td className="wk_width_2 wk_text_right">$1000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="wk_invoice_footer wk_mb30 wk_m0_md">
                <div className="wk_left_footer">
                  <p className="wk_mb2">
                    Total Weight: <b className="wk_primary_color">40kg</b>
                  </p>
                  <p className="wk_m0">
                    Shipment Terms: <b className="wk_primary_color">DDU</b>
                  </p>
                </div>
                <div className="wk_right_footer">
                  <table>
                    <tbody>
                      <tr>
                        <td className="wk_width_3 wk_primary_color wk_border_none wk_bold">Subtoal</td>
                        <td className="wk_width_3 wk_primary_color wk_text_right wk_border_none wk_bold">
                          $1650
                        </td>
                      </tr>
                      <tr>
                        <td className="wk_width_3 wk_primary_color wk_border_none wk_pt0">
                          Tax <span className="wk_ternary_color">(10%)</span>
                        </td>
                        <td className="wk_width_3 wk_primary_color wk_text_right wk_border_none wk_pt0">
                          +$905
                        </td>
                      </tr>
                      <tr className="wk_border_top wk_border_bottom">
                        <td className="wk_width_3 wk_border_top_0 wk_bold wk_f16 wk_primary_color">
                          Grand Total{' '}
                        </td>
                        <td className="wk_width_3 wk_border_top_0 wk_bold wk_f16 wk_primary_color wk_text_right">
                          $9955
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="wk_invoice_footer wk_type1">
                <div className="wk_left_footer"></div>
                <div className="wk_right_footer">
                  <div className="wk_sign wk_text_center">
                    <img src="assets/img/sign.svg" alt="Sign" />
                    <p className="wk_m0 wk_ternary_color">Jhon Donate</p>
                    <p className="wk_m0 wk_f16 wk_primary_color">Accounts Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wk_invoice_btns wk_hide_print">
          <a href="javascript:window.print()" className="wk_invoice_btn wk_color1">
            <span className="wk_btn_icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                <path
                  d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="32"
                ></path>
                <rect
                  x="128"
                  y="240"
                  width="256"
                  height="208"
                  rx="24.32"
                  ry="24.32"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="32"
                ></rect>
                <path
                  d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="32"
                ></path>
                <circle cx="392" cy="184" r="24" fill="currentColor"></circle>
              </svg>
            </span>
            <span className="wk_btn_text">Print</span>
          </a>
          <button id="wk_download_btn" className="wk_invoice_btn wk_color2">
            <span className="wk_btn_icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                <path
                  d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                ></path>
              </svg>
            </span>
            <span className="wk_btn_text">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
