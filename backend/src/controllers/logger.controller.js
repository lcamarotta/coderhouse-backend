const test = async(req, res) => {
    req.logger.fatal(`Logger Test, level fatal - ${new Date().toISOString()}`);
    req.logger.error(`Logger Test, level error - ${new Date().toISOString()}`);
    req.logger.warning(`Logger Test, level warning - ${new Date().toISOString()}`);
    req.logger.info(`Logger Test, level info - ${new Date().toISOString()}`);
    req.logger.http(`Logger Test, level http - ${new Date().toISOString()}`);
    req.logger.debug(`Logger Test, level debug - ${new Date().toISOString()}`);

    res.send({ message: 'logger test' });
};

export {
    test
}
