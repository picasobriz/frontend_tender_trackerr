import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import BidForm from "../components/BidForm";
import BidRow from "../components/BidRow";
import Notice from "../components/Notice";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";