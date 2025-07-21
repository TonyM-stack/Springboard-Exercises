// src/pages/SpacecraftCard.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading";
import Button from "../components/Button";
import styles from "./SpacecraftCard.module.css";

export default function SpacecraftCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      // if you have a getSpacecraftById endpoint, use that:
      // const res = await SpaceTravelApi.getSpacecraftById({ id });
      // otherwise fetch all and pick one:
      const res = await SpaceTravelApi.getSpacecrafts();
      if (res.isError) {
        setError("Could not load spacecraft.");
      } else {
        const found = res.data.find((s) => s.id === id);
        if (!found) setError("Spacecraft not found.");
        else setCraft(found);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <Loading />;
  if (error)   return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <Button onClick={() => navigate(-1)} variant="backButton">
        ← Back
      </Button>

      <h1 className={styles.name}>{craft.name}</h1>

      <div className={styles.main}>
        <img
          src={craft.pictureUrl}
          alt={craft.name}
          className={styles.image}
        />
        <div className={styles.info}>
          <p>
            <strong>Capacity:</strong> {craft.capacity}
          </p>
          <p className={styles.description}>
            {craft.description}
          </p>
        </div>
      </div>
    </div>
  );
}


