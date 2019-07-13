import pool from "../models/pool";

const trips = {
    createTrip: (req, res) => {
        const { 
            token,
            user_id,
            is_admin,
            bus_id,
            origin,
            destination,
            fare,
         } = req.body;
         let trip;
    pool.query(`INSERT INTO 
    trips(bus_id, origin, destination, fare)
    VALUES($1, $2, $3, $4)
    RETURNING *`,
    [bus_id, origin, destination, fare])
    .then((res) => {
        trip = res;
    })
    .catch((err) => {
        res.status(500).send({
            status: "error",
            error: "internal server error"
        });
    });
    res.send({
        status: "success",
        data: {
            trip_id: trip.rows[0].id,
            bus_id: trip.rows[0].bus_id,
            origin: trip.rows[0].origin,
            destination: trip.rows[0].destination,
            trip_date: trip.rows[0].trip_date,
            fare: trip.rows[0].fare,
        }
    });
    },
    getTrips: (req, res) => {
        pool.query(`SELECT * FROM trips;`)
        .then((result) => {
            res.send({
                status: "success",
                data: result.rows,
            });
        })
        .catch((err) => {
            res.status(500).send({
            status: "error",
            error: "internal server error"
        });
    });
    }
};
export default trips;