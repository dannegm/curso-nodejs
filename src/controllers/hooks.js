import db from '@/database';
import { nanoid } from 'nanoid'

export const hookController = async (req, res) => {
  const payload = {
    id: nanoid(),
    created_at: (new Date()).toISOString(),
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  };

  db.push(`/hooks/${payload.id}`, payload);

  res.status(201).json(payload);
};

export const hookHistory = async (req, res) => {
  const registers = db.getData('/hooks')
  res.status(200).json(Object.values(registers));
};

export const hookSingle = async (req, res) => {
  const hookID = req.params.hookID;
  const hookData = db.getData(`/hooks/${hookID}`);
  res.status(200).json(hookData);
};
