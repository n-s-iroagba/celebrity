import { useEffect, useState } from "react";
import axios from "axios";

interface Survey {
  id: number;
  step: string;
  selectedCeleb: string;
  formData: Record<string, any>;
  fanDetails: {
    firstName: string;
    surname: string;
  };
}

const useFetchSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get<Survey[]>("/api/surveys/all-surveys");
        setSurveys(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch surveys.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  return { surveys, loading, error };
};

export default useFetchSurveys;
