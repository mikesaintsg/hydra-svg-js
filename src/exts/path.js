import path from 'path'

path.prefixCwd = function (...filePath) {
	return path.join(process.cwd(), ...filePath)
}

export default path;
