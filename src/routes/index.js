export function post(req, res, next) {
    console.log(req.body);
    joinRoom();
    res.end('ok');
}
