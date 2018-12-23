/**
 * This is forked from John Resig's micro-templating function
 * http://ejohn.org/blog/javascript-micro-templating/
 *
 * Also thanks to Neil Donewar's correction
 * http://ejohn.org/blog/javascript-micro-templating/#comment-321850
 *
 * Generate a reusable function that will serve as a template generator.
 * 生成可重用的函数，作为模板生成器。
 *
 * @param {String} str The template string
 * @param {String} [replace='replace'] Don't use
 * @return {Function} Template function
 */
function mito(str, replace) {
    /* 禁止对 Function 对象使用 new 操作符,禁止出现令人困惑的多行表达式*/
    /* eslint no-new-func: 0, no-unexpected-multiline: 0 */

    replace = 'replace'

    /**
     * Renders the given template parameter.
     * 呈现给定的模板参数。
     *
     * @param {Object} o The template parameter 模板参数
     * @param {String} [J=''] The string buffer (don't use) 字符串缓冲区(不使用)
     * @return {String} Rendered string 渲染的字符串
     */
    return Function('o,J',

        // Introduces the data as local variables using with(){}
        'with(o||{}){J=\'' +

            // Converts the template into pure JavaScript 将模板转换为纯JavaScript
            str

            [replace](/\s/g, ' ')


            // Converts the opening tag to \0 将开始标记转换为\0
            [replace](/<%/g, '\0')

            // Escapes single quote, \r and \n in literal mode to the escape sequence 转义单引号，\r和\n在文字模式转义序列
            // (escaped \r and \n means line continuations, = empty) (转义\r和\n表示连续行，=空)
            [replace](/'(?![^\0]*%>)/g, '\\$&')

            // Replaces <%= ... %> pattern, using non-greedy matching (.*?) 替换< % =…%>模式，使用非贪婪匹配(.*?)
            [replace](/\0=(.*?)%>/g, '\0J+=$1%>')

            // Converts the opening and closing tags
              [replace](/\0/g, '\';')
              [replace](/%>/g, ';J+=\'') +

        '\'}' +

        'return J'

    )

}
