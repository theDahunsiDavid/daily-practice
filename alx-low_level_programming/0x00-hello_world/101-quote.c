#include <stdio.h>
#include <unistd.h>
#include <string.h>

/**
 * Main - Entry point.
 *
 * Description: writes given string to standard error
 * without using printf or puts or their variations.
 *
 * Returns: 1 (failure).
 */
int main(void)
{
	char *str2print = "and that piece of art is useful\" - Dora Korpar, 2015-10-19";
	int len = strlen(str2print) + 1;

	write(STDERR_FILENO, str2print, len);
	return (1);
}
