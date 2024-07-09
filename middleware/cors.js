import cors from "cors";

const ACCEPTED_ORIGINS = ["http://localhost:5173"];

// const  corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {})=> cors({});

function corsMiddleware({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });
}

export default corsMiddleware;
