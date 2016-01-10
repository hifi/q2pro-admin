<?php

set_include_path(get_include_path() . PATH_SEPARATOR . __DIR__ . DIRECTORY_SEPARATOR . 'include');
function get(&$v, $def = false) { return $v ? $v : $def; }

class APIException extends Exception {}

class API
{
    protected $user = false;

    public function __construct($sessionId = false)
    {
        if ($sessionId == 'dummy')
            $this->user = array('username' => 'admin', 'superUser' => true);
    }

    protected function _requireUser($super = false)
    {
        if ($this->user === false)
            throw new APIException('Session expired.');

        if ($super === true && !$this->user['superUser'])
            throw new APIException('Access denied.');
    }

    protected function _isSuper()
    {
        return ($this->user && $this->user['superUser']);
    }

    public function login($username, $password)
    {
        if ($username != 'test' || $password != 'test')
            throw new APIException('Invalid username or password');

        return array(
            'sessionId' => 'dummy',
            'superUser' => true,
        );
    }

    public function logout()
    {
        $this->_requireUser();
        return null;
    }

    public function userList()
    {
        $this->_requireUser(true);
        return array(
            array(
                'id'        => -1,
                'superUser' => true,
                'username'  => 'Admin',
            )
        );
    }

    public function userAdd($superUser, $username, $password)
    {
        $this->_requireUser(true);
        return null;
    }

    public function userEdit($id, $superUser, $username, $password)
    {
        $this->_requireUser(true);
        return null;
    }

    public function userDelete($id)
    {
        $this->_requireUser(true);
        return null;
    }

    public function serverList()
    {
        $this->_requireUser();
        return array(
            array(
                'id'        => -1,
                'host'      => '127.0.0.1:27910',
                'name'      => 'Test Server',
                'uptime'    => '7 days 1 hour and 2 minutes',
            )
        );
    }

    public function serverAdd($name, $host, $rcon)
    {
        $this->_requireUser(true);
        return null;
    }

    public function serverEdit($id, $name, $host, $rcon)
    {
        $this->_requireUser(true);
        return null;
    }

    public function serverDelete($id)
    {
        $this->_requireUser(true);
        return null;
    }

    public function rcon($serverId, $command)
    {
        $this->_requireUser();
        return 'Dummy rcon command reply.';
    }

    public function banList()
    {
        $this->_requireUser();
        return array(
            array(
                'id'        =>  -1,
                'cidr'      => '127.0.0.1/24',
                'nick'      => 'Player',
                'reason'    => 'Cheating.',
                'expires'   => NULL,
                'added'     => '2016-01-01 01:01:01',
                'username'  => 'Admin',
            )
        );
    }

    public function banAdd($cidr, $nick, $reson, $expires)
    {
        $this->_requireUser();
        return null;
    }

    public function banDelete($id)
    {
        $this->_requireUser();
        return null;
    }

    public function logView($limit, $offset)
    {
        $this->_requireUser(true);
        return array(
            array(
                'value'     => 'Log line.',
                'added'     => '2016-01-01 01:01:01',
                'username'  => 'Admin',
            )
        );
    }
}

if (php_sapi_name() == 'cli') {
    echo "CLI: Reading JSON from stdin.\n";
    $input = file_get_contents('php://stdin');
} else {
    $input = file_get_contents('php://input');
}

try {
    $data = json_decode($input, true);

    if (!is_array($data))
        throw new APIException('Input not in JSON format.');

    $methodName = get($data['method']);
    unset($data['method']);

    $sessionId = get($data['sessionId']);
    unset($data['sessionId']);

    if (!$methodName)
        throw new APIException('No method in input.');

    $method = new ReflectionMethod('API', $methodName);
    if (!$method->isPublic())
        throw new ReflectionException;

    $methodParamCount = count($method->getParameters());
    if (count($data) != $methodParamCount)
        throw new APIException(sprintf('Method expects %d parameters, got %d.', $methodParamCount, count($data)));

    $params = array();
    foreach ($method->getParameters() as $k => $v) {
        if (!array_key_exists($v->name, $data))
            throw new APIException(sprintf("Parameter '%s' missing from input.", $v->name));

        $params[$k] = $data[$v->name];
    }

    $api = new API($sessionId);

    echo json_encode(array(
        'error' => NULL,
        'data'  => $method->invokeArgs($api, $params)
    )) . "\n";
} catch (APIException $e) {
    echo json_encode(array(
        'error' => $e->getMessage(),
        'data'  => NULL,
    )) . "\n";
} catch (ReflectionException $e) {
    echo json_encode(array(
        'error' => 'Requested method not available.',
        'data'  => NULL,
    )) . "\n";
} catch (Exception $e) {
    echo json_encode(array(
        'error' => 'Unhandled exception from API. Error message suppressed.',
        'data'  => NULL,
    )) . "\n";
    throw $e;
}
